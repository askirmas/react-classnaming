/**
 * Tools to establish CSS classes as an explicit abstraction layer and to handle it as an interface between React and CSSStyleDeclaration
 * GitHub: https://github.com/askirmas/react-classnaming
 * 
 * Contains:
 * ```typescript
 * interface BemOptions {}
 * ```
 */
declare namespace ReactClassNaming {
/**
 * Add your own `elementDelimiter` and `modDelimiter`.
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
}
