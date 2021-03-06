import {combine} from './combine'
import {step} from './typedef'
import {createStateRef, readRef} from './stateRef'
import {callStackAReg, callARegStack} from './caller'
import {processArgsToConfig} from './config'
import {getStoreState, getGraph} from './getter'
import {own} from './own'
import {assertNodeSet, is, isObject} from './is'
import {createStore} from './createUnit'
import {createEvent} from './createUnit'
import {createLinkNode} from './forward'
import {createNode} from './createNode'
import {readTemplate} from './region'
import {throwError} from './throw'
import {includes, forEach} from './collection'
import {REG_A, SAMPLE, SAMPLER, STACK, STORE, VALUE} from './tag'
import {merge} from './merge'

const sampleConfigFields = ['source', 'clock', 'target']

function validateSampleConfig(config: any) {
  let atLeastOneFieldExists = false
  forEach(sampleConfigFields, field => {
    if (field in config) {
      if (config[field] == null) {
        throwError(`sample: ${field} should be defined`)
      }
      atLeastOneFieldExists = true
    }
  })
  return atLeastOneFieldExists
}

export function sample(...args: any): any {
  let target
  let name
  let [[source, clock, fn], metadata] = processArgsToConfig(args)
  let sid
  let greedy
  //config case
  if (clock === undefined && isObject(source) && validateSampleConfig(source)) {
    clock = source.clock
    fn = source.fn
    greedy = source.greedy
    //optional target & name accepted only from config
    target = source.target
    name = source.name
    sid = source.sid
    source = source.source
  }
  let needToCombine = true
  if (source === undefined) {
    assertNodeSet(clock, 'sample', 'clock')
    if (Array.isArray(clock)) {
      clock = merge(clock)
    }
    source = clock
    needToCombine = false
  }
  if (needToCombine && !is.unit(source)) {
    source = combine(source)
  }
  if (clock === undefined) {
    //still undefined!
    clock = source
  }
  assertNodeSet(clock, 'sample', 'clock')
  name = metadata || name || source.shortName
  const template = readTemplate()
  const isUpward = !!target
  if (!target) {
    if (is.store(source) && is.store(clock)) {
      const initialState = fn
        ? fn(readRef(getStoreState(source)), readRef(getStoreState(clock)))
        : readRef(getStoreState(source))
      target = createStore(initialState, {name, sid})
    } else {
      target = createEvent(name)
      if (template) {
        getGraph(target).seq.push(template.loader)
      }
    }
  }
  const targetTemplate =
    isUpward && is.unit(target) && getGraph(target).meta.nativeTemplate
  if (is.store(source)) {
    const sourceRef = getStoreState(source)
    own(source, [
      createLinkNode(clock, target, {
        scope: {fn, targetTemplate},
        node: [
          template && template.loader,
          //@ts-ignore
          !greedy && step.barrier({priority: SAMPLER}),
          step.mov({
            store: sourceRef,
            to: fn ? REG_A : STACK,
          }),
          fn && step.compute({fn: callARegStack}),
          template && isUpward && template.upward,
        ],
        meta: {op: SAMPLE, sample: STORE},
      }),
    ])
    if (template) {
      if (
        !includes(template.plain, sourceRef) &&
        !includes(template.closure, sourceRef)
      ) {
        template.closure.push(sourceRef)
      }
    }
  } else {
    const hasSource = createStateRef(false)
    const sourceState = createStateRef()
    const clockState = createStateRef()
    if (template) {
      template.plain.push(hasSource, sourceState, clockState)
    }
    createNode({
      parent: source,
      node: [
        step.update({store: sourceState}),
        step.mov({
          from: VALUE,
          store: true,
          target: hasSource,
        }),
      ],
      family: {
        owners: [source, target, clock],
        links: target,
      },
      meta: {op: SAMPLE, sample: 'source'},
      regional: true,
    })
    own(source, [
      createLinkNode(clock, target, {
        scope: {
          fn,
          targetTemplate,
        },
        node: [
          template && template.loader,
          step.update({store: clockState}),
          step.mov({store: hasSource}),
          step.filter({fn: hasSource => hasSource}),
          //@ts-ignore
          !greedy && step.barrier({priority: SAMPLER}),
          step.mov({store: sourceState}),
          step.mov({
            store: clockState,
            to: REG_A,
          }),
          fn && step.compute({fn: callStackAReg}),
          template && isUpward && template.upward,
        ],
        meta: {op: SAMPLE, sample: 'clock'},
      }),
    ])
  }
  return target
}
