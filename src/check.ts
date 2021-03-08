import { EMPTY_OBJECT } from "./consts.json"
import type { CssModule, ClassHash } from "./types"

export {
  classNamesCheck
}

/**
 * Identical function or returning constant `EMPTY_OBJECT` for keys check of not required classes
 * @example
 * ```tsx
 *  // Dummies shape
 *  <Component classnames={classNamesCheck()} />;
 * 
 * import css_module from "./some.css" // With redundant `.never-used {...}`
 * // TS-check via arguments
 *  <Component classnames={classNamesCheck(
 *    css_module, 
 *    //@ts-expect-error Property 'never-used' is missing
 *    {} as ComponentClassNames
 *  )} />;
 *
 * // TS-check via generics
 *  <Component classnames={classNamesCheck<
 *    //@ts-expect-error Type 'ComponentClassNames' does not satisfy the constraint
 *    ComponentClassNames,
 *    typeof css_module // has redundant `.never-used {...}`
 *  >(css_module)} />;
 * ```
 */
 function classNamesCheck<C extends {[K in keyof T]: ClassHash}, T extends CssModule = CssModule>(
  source = EMPTY_OBJECT as T,
  _ = EMPTY_OBJECT as C
) {
  return source
}
