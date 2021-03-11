import type { CssModule } from "./definitions.types";
import type { ClassBeming, BemInGeneral } from "./bem.types";
import { bem2arr } from "./bem.core";
import { joinWithLead, picker, wrapper } from "./core"
import { EMPTY_OBJECT } from "./consts.json"

export {
  classBeming
}

/** Set context
 * @example
 * ```typescript
 *   const bem = classBeming({classnames: require("./some.css"), className?})
 *   const bem = classBeming(this.props)
 *   const bem = classBeming<Props>()
 *   const bem = classBeming<MyClassNames>()
 * ```
 */
function classBeming<
  Ctx extends {classnames: Source, className?: string},
  Source extends CssModule = Ctx["classnames"],
  //TODO #29 WithClassName extends boolean = Ctx["className"] extends string ? true : false
>(
 context: Ctx = EMPTY_OBJECT as Ctx
) {
  const {className} = context
  const host: ClassBeming<Source> = (arg0?, arg1?) => bem(context, arg0, arg1)

  return wrapper(host, className)
}

function bem<
  Source extends CssModule,
>(
  {
    className,
    classnames,
  }: {
    className?: string,
    classnames?: Source,
  },
  arg0?: boolean | BemInGeneral,
  arg1?: BemInGeneral 
) {
  const source = typeof arg0 === "object" ? arg0 : arg1
  , debemed = source && bem2arr(source)
  , picked = debemed && picker(classnames, debemed)
  , result = joinWithLead(arg0 === true && className, picked)

  return {className: result}
}
