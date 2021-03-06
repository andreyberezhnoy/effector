import {Node, StateRef} from './index.h'

export const getGraph = (graph: any): Node => graph.graphite || graph
export const getOwners = (node: Node) => node.family.owners
export const getLinks = (node: Node) => node.family.links
export const getStoreState = (store: any): StateRef => store.stateRef
export const getConfig = (opts: any) => opts.config
export const getNestedConfig = (opts: any) => opts.ɔ
export const getValue = (stack: any) => stack.value
export const getSubscribers = (store: any) => store.subscribers
export const getParent = (unit: any) => unit.parent
export const getForkPage = (val: any) => val.forkPage
