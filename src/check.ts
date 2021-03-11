import { EMPTY_OBJECT } from "./consts.json"
import type { ClassHash } from "./main.types"
import type { CssModule } from "./definitions.types"

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
 * import type { ClassNamesFrom } from "react-classnaming/types"
 * import css_module from "./some.css" // With class `.never-used {...}`
 *
 *  <Component classnames={classNamesCheck(
 *    css_module, 
 *    //@ts-expect-error Property 'never-used' is missing
 *    {} as ClassNamesFrom<typeof Component>
 *  )} />;
 * ```
 */
 function classNamesCheck<
  Target extends {[K in keyof Module]: ClassHash},
  Module extends CssModule
>(
  source = EMPTY_OBJECT as Module,
  _ = EMPTY_OBJECT as Target
): string extends keyof Module ? Target : Module {
  //@ts-expect-error
  return source
}
