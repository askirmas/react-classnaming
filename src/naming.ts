import type {
  ClassHash,
} from "./main.types"
import type {
  CssModule,
  ActionsOf,
} from "./definitions.types"
import type { Falsy } from "./ts-swiss.types"
import {
  joinWithLead,
  resolver,
  wrapper
} from "./core"
import { EMPTY_OBJECT } from "./consts.json"
import type {
  ClassNamingFn,
  ClassNaming
} from "./naming.types"

export { classNaming }

/** Set context
 * @example
 * ```typescript
 *   const classes = classNaming({classnames: require("./some.css"), className?})
 *   const classes = classNaming(this.props)
 *   const classes = classNaming<Props>()
 *   const classes = classNaming<MyClassNames>()
 * ```
 */
function classNaming<
  Ctx extends {classnames: Source, className?: string},
  Source extends CssModule = Ctx["classnames"],
  WithClassName extends boolean = Ctx["className"] extends string ? true : false
>(
  context: Ctx = EMPTY_OBJECT as Ctx
): ClassNaming<WithClassName, {}, Source> {
  const {className} = context
  
  const host: ClassNamingFn<Source, {}, WithClassName> = (arg0?, arg1?) => classes(
    context,
    arg0,
    arg1
  )

  return wrapper(host, className)
}

/// CONTEXTED. TS-notation not matters

function classes<
  Source extends CssModule,
  Actions extends ActionsOf<Source>
>(
  {
    className,
    classnames,
    stacked: preStacked,
  }: {
    className?: string,
    classnames: Source,
    stacked?: string|undefined
  },
  arg0?: Falsy | true | Actions,
  arg1?: Falsy | Actions
): ClassNaming<boolean, {}, Source> {
  const source = typeof arg0 === "object" ? arg0 as Actions: arg1 as Actions
  //TODO check what will happen with classes()
  , allowed = source && resolver(classnames, source! /* TS-bug? `source` couldn't be `undefined`*/)
  , stacked = joinWithLead(preStacked, allowed)
  , result = arg0 === true && className
  ? joinWithLead(className, stacked)
  : stacked
  , host: ClassNamingFn<
    {[K in Exclude<keyof Source, keyof Actions>]: ClassHash},
    {},
    boolean
  > = (arg0?, arg1?) => classes({classnames, className, stacked: result},
    //@ts-expect-error Due to not accurate `withClassName`
    arg0,
    arg1
  )

  return wrapper(
    host,
    result,
  )
}   
