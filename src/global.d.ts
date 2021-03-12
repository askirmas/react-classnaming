/**
 * Tools to establish CSS classes as an explicit abstraction layer and to handle it as an interface between React and CSSStyleDeclaration
 * GitHub: https://github.com/askirmas/react-classnaming
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
}
