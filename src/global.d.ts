/**
 * Tools to establish CSS classes as an explicit abstraction layer and to handle it as an interface between React and CSSStyleDeclaration
 *
 * GitHub: https://github.com/askirmas/react-classnaming
 * 
 * Contains:
 * ```typescript
 * interface BemOptions {}
 * interface AtomOptions {}
 * interface StrToNum {}
 * ```
 */
declare namespace ReactClassNaming {
/**
 * Add your own `elementDelimiter` and `modDelimiter`
 * @description
 * ```typescript
 * `block${elementDelimiter}element${modDelimiter}mod${modDelimiter}value`
 * ```
 * @example
 * ```typescript
 * interface BemOptions {
 *   elementDelimiter: "_",
 *   modDelimiter: "-"
 * }
 * ```
 * @default
 * ```javascript
 * {
 *    elementDelimiter: "__",
 *    modDelimiter: "--"
 * }
 * ```
 */
  interface BemOptions {
    $default: {
      elementDelimiter: "__",
      modDelimiter: "--"
    }
  }
  /**
   * Add your own `delimiter` and `selfKey`
   * @description
   * ```typescript
   * {
   *   "justify-content": {
   *      [selfKey]: "around",
   *      lg: "between"
   *   }
   * } => `justify-content${delimiter}around justify-content${delimiter}lg${delimiter}between`
   * ```
   * @example 
   * interface AtomOptions {
   *    delimiter: "--"
   *    selfKey: "$",
   * }
   * @default
   * ```javascript
   * {
   *    delimiter: "-"
   *    selfKey: "_",
   * }
   * ```
   */
  interface AtomOptions {
    $default: {
      delimiter: "-"
      selfKey: "_"
    }
  }

  /**
   * Extend with needed `string`:`number` pairs
   */
  interface StrToNum {
    "0": 0
    "1": 1
    "2": 2
    "3": 3
    "4": 4
    "5": 5
    "6": 6
    "7": 7
    "8": 8
    "9": 9
    "10": 10
    "11": 11
    "12": 12
    "25": 25
    "50": 50
    "75": 75
    "100": 100
  }

  //TODO apply to bem
  type ParseInt<K extends string> = K extends keyof StrToNum ? StrToNum[K] : K
}
