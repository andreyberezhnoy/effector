/**
 * Flowtype definitions for prism
 * Generated by Flowgen from a Typescript Definition
 * Flowgen v2.1.4
 * Author: [Joar Wilk](http://twitter.com/joarwilk)
 * Repo: http://github.com/joarwilk/flowgen
 */

declare module 'prismjs' {
  declare export var util: Util
  declare export var languages: Languages
  declare export var plugins: any
  declare export var hooks: Hooks
  /**
   * Used to highlight all elements on current website. Calls Prism.highlightAllUnder on `document`.
   * @see highlightAllUnder
   * @param async Whether to use Web Workers to improve performance and avoid blocking the UI when highlighting
   * very large chunks of code. False by default.
   * @param callback An optional callback to be invoked after the highlighting is done. Mostly useful when async
   * is true, since in that case, the highlighting is done asynchronously.
   */
  declare export function highlightAll(
    async?: boolean,
    callback?: (element: Element) => void,
  ): void

  /**
   * This is the most high-level function in Prism’s API. It fetches all the elements inside `container` that
   * have a .language-xxxx class and then calls Prism.highlightElement() on each one of them.
   * @param container The element which contains elements containing code.
   * @param async Whether to use Web Workers to improve performance and avoid blocking the UI when highlighting
   * very large chunks of code. False by default.
   * @param callback An optional callback to be invoked after the highlighting is done. Mostly useful when async
   * is true, since in that case, the highlighting is done asynchronously.
   */
  declare export function highlightAllUnder(
    container: Element,
    async?: boolean,
    callback?: (element: Element) => void,
  ): void

  /**
   * Highlights the code inside a single element.
   * @param element The element containing the code. It must have a class of language-xxxx to be processed,
   * where xxxx is a valid language identifier.
   * @param async Whether to use Web Workers to improve performance and avoid blocking the UI when
   * highlighting very large chunks of code. False by default.
   * @param callback An optional callback to be invoked after the highlighting is done.
   * Mostly useful when async is true, since in that case, the highlighting is done asynchronously.
   */
  declare export function highlightElement(
    element: Element,
    async?: boolean,
    callback?: (element: Element) => void,
  ): void

  /**
   * Low-level function, only use if you know what you’re doing. It accepts a string of text as input and the language
   * definitions to use, and returns a string with the HTML produced.
   * @param text A string with the code to be highlighted.
   * @param grammar - An object containing the tokens to use. Usually a language definition like
   * Prism.languages.markup
   * @returns The highlighted HTML
   */
  declare export function highlight(
    text: string,
    grammar: LanguageDefinition,
    language?: LanguageDefinition,
  ): string

  /**
   * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input and the
   * language definitions to use, and returns an array with the tokenized code. When the language definition includes
   * nested tokens, the function is called recursively on each of these tokens. This method could be useful in other
   * contexts as well, as a very crude parser.
   * @param text A string with the code to be highlighted.
   * @param grammar An object containing the tokens to use. Usually a language definition like
   * Prism.languages.markup
   * @returns An array of strings, tokens (class Prism.Token) and other arrays.
   */
  declare export function tokenize(
    text: string,
    grammar: LanguageDefinition,
  ): Array<Token | string>
  declare export function fileHighlight(): void
  declare export interface Environment {
    element?: Element;
    language?: LanguageDefinition;
    grammar?: any;
    code?: any;
    highlightedCode?: any;
    type?: string;
    content?: string;
    tag?: string;
    classes?: string[];
    attributes?: any;
    parent?: Element;
  }
  declare export interface Identifier {
    value: number;
  }
  declare export interface Util {
    /**
     * Encode raw strings in tokens in preparation to display as HTML
     */
    encode(tokens: TokenNode): TokenNode;

    /**
     * Determine the type of the object
     */
    type(o: any): string;

    /**
     * Get the unique id of this object or give it one if it does not have one
     */
    objId(obj: any): Identifier;

    /**
     * Deep clone a language definition (e.g. to extend it)
     */
    clone(o: LanguageDefinition): LanguageDefinition;
  }
  declare export interface LanguageDefinition {
    keyword?: RegExp | LanguageDefinition;
    number?: RegExp | LanguageDefinition;
    function?: RegExp | LanguageDefinition;
    string?: RegExp | LanguageDefinition;
    boolean?: RegExp | LanguageDefinition;
    operator?: RegExp | LanguageDefinition;
    punctuation?: RegExp | LanguageDefinition;
    atrule?: RegExp | LanguageDefinition;
    url?: RegExp | LanguageDefinition;
    selector?: RegExp | LanguageDefinition;
    property?: RegExp | LanguageDefinition;
    important?: RegExp | LanguageDefinition;
    style?: RegExp | LanguageDefinition;

    /**
     * This option can be used to define one or more aliases for the matched token. The result will be, that the styles
     * of the token and its aliases are combined. This can be useful, to combine the styling of a well known token,
     * which is already supported by most of the themes, with a semantically correct token name. The option can be
     * set to a string literal or an array of string literals. In the following example the token name latex-equation
     * is not supported by any theme, but it will be highlighted the same as a string.
     */
    alias?: string;
    pattern?: RegExp;

    /**
     * This option mitigates JavaScript’s lack of lookbehind. When set to true, the first capturing group in the regex
     * pattern is discarded when matching this token, so it effectively behaves as if it was lookbehind
     */
    lookbehind?: boolean;

    /**
     * This property accepts another object literal, with tokens that are allowed to be nested in this token.
     * This makes it easier to define certain languages. However, keep in mind that they’re slower and if coded poorly,
     * can even result in infinite recursion. For an example of nested tokens, check out the Markup language definition
     */
    inside?: LanguageDefinition;

    /**
     * Accepts an object literal with tokens and appends them to the end of the current object literal.
     */
    rest?: Token[];
  }
  declare export type Languages = LanguageMap & LanguageMapProtocol
  declare export interface LanguageMap {
    /**
     * Get a defined language's definition
     */
    [key: string]: LanguageDefinition;
  }
  declare export interface LanguageMapProtocol {
    /**
     * Extend a language definition
     * @param id The language definition to extend
     * @param redef The new language definition to extend the original
     */
    extend(id: string, redef: LanguageDefinition): LanguageDefinition;

    /**
     * Insert a token before another token in a language literal
     * As this needs to recreate the object (we cannot actually insert before keys in object literals),
     * we cannot just provide an object, we need anobject and a key.
     * @param inside The key (or language id) of the parent
     * @param before The key to insert before. If not provided, the function appends instead.
     * @param insert Object with the key/value pairs to insert
     * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
     */
    insertBefore(
      inside: string,
      before: string,
      insert: LanguageDefinition,
      root: LanguageDefinition,
    ): LanguageDefinition;
  }
  declare export type HookCallback = (env: Environment) => void
  declare export type AvailableHooks =
    | 'before-highlightall'
    | 'before-sanity-check'
    | 'before-highlight'
    | 'before-insert'
    | 'after-highlight'
    | 'complete'
    | 'wrap'
  declare export interface Hooks {
    all: Array<Array<(env: Environment) => void>>;
    add(name: AvailableHooks | string, callback: HookCallback): void;
    run(name: AvailableHooks | string, env: Environment): void;
  }
  declare export type TokenNode = Token | string | Array<Token | string>
  declare export class Token {
    /**
     * Given a token or string input, convert it to highlighted HTML
     * @param type The token(s) to stringify
     * @param language The language definition that understands the given token(s)
     * @param parent The parent element element to pass into hook callbacks
     * @returns The HTML that represents the given token(s)
     */
    static stringify(
      token: TokenNode,
      language: LanguageDefinition,
      parent: HTMLPreElement,
    ): string;

    /**
     * The constructor for the Prism Token class
     * @param type The type of the token
     * @param content The contents of the token
     * @param alias Aliases for the current token (added as classes to this token's HTML)
     * @param matchedStr The matched string that generated this token
     * @param greedy Value that determines whether or not this token was generated using a greedy parsing algorithm
     */
    constructor(
      type: string,
      content: TokenNode,
      alias: any,
      matchedStr: string,
      greedy: boolean,
    ): this;

    /**
     * The type of the token
     */
    type: string;

    /**
     * The content of the token
     */
    content: TokenNode;

    /**
     * Other names for this token (added as classes to this token's HTML)
     */
    alias: string;
  }
}
declare module 'prismjs/themes/prism-coy.css' {
}
declare module 'prismjs/themes/prism-dark.css' {
}
declare module 'prismjs/themes/prism-funky.css' {
}
declare module 'prismjs/themes/prism-okaidia.css' {
}
declare module 'prismjs/themes/prism-solarizedlight.css' {
}
declare module 'prismjs/themes/prism-tomorrow.css' {
}
declare module 'prismjs/themes/prism-twilight.css' {
}
declare module 'prismjs/themes/prism.css' {
}

declare module 'prismjs/components/index' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-abap' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-actionscript' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-ada' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-apacheconf' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-apl' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-applescript' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-arduino' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-arff' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-asciidoc' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-asm6502' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-aspnet' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-autohotkey' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-autoit' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-bash' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-basic' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-batch' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-bison' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-brainfuck' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-bro' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-c' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-clike' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-clojure' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-coffeescript' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-core' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-cpp' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-crystal' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-csharp' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-csp' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-css-extras' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-css' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-d' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-dart' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-diff' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-django' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-docker' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-eiffel' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-elixir' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-elm' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-erb' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-erlang' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-flow' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-fortran' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-fsharp' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-gedcom' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-gherkin' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-git' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-glsl' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-go' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-graphql' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-groovy' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-haml' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-handlebars' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-haskell' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-haxe' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-hpkp' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-hsts' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-http' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-ichigojam' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-icon' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-inform7' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-ini' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-io' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-j' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-java' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-javascript' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-jolie' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-json' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-jsx' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-julia' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-keyman' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-kotlin' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-latex' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-less' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-liquid' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-lisp' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-livescript' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-lolcode' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-lua' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-makefile' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-markdown' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-markup-templating' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-markup' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-matlab' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-mel' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-mizar' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-monkey' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-n4js' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-nasm' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-nginx' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-nim' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-nix' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-nsis' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-objectivec' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-ocaml' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-opencl' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-oz' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-parigp' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-parser' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-pascal' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-perl' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-php-extras' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-php' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-plsql' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-powershell' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-processing' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-prolog' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-properties' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-protobuf' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-pug' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-puppet' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-pure' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-python' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-q' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-qore' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-r' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-reason' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-renpy' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-rest' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-rip' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-roboconf' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-ruby' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-rust' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-sas' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-sass' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-scala' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-scheme' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-scss' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-smalltalk' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-smarty' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-soy' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-sql' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-stylus' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-swift' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-tap' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-tcl' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-textile' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-tsx' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-tt2' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-twig' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-typescript' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-vbnet' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-velocity' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-verilog' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-vhdl' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-vim' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-visual-basic' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-wasm' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-wiki' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-xeora' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-xojo' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-xquery' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
declare module 'prismjs/components/prism-yaml' {
  import type {LanguageDefinition} from 'prismjs'
  declare export default LanguageDefinition
}
