import { EMPTY_OBJECT } from "./consts.json"
import type { CssModule, ClassHash } from "./types"

export {
  classNamesCheck
}

/**
 * Identical function or returning constant `EMPTY_OBJECT` for keys check of not used classes in components tree 
 * @example
 * ```tsx
 *  // Dummies shape
 *  <Component classnames={classNamesCheck()} />;
 * ```
 * ---
 * ```tsx
 * import css_module from "./some.css" // With class `.never-used {...}`
 *
 *  <Component classnames={classNamesCheck(
 *    css_module, 
 *    //@ts-expect-error Property 'never-used' is missing
 *    {} as ComponentClassNames
 *  )} />;
 * ```
 */
 function classNamesCheck<C extends {[K in keyof T]: ClassHash}, T extends CssModule = CssModule>(
  source = EMPTY_OBJECT as T,
  _ = EMPTY_OBJECT as C
) {
  return source
}
