import type { CssModule } from "./defs"
import type {
  ActionsMap,
  ClassNamingThis,
  ClassNamingCall,
  ClassNaming,
  ClassNamingContext
} from "./index.types"
import {joinWithLead, resolver, wrapper} from "./core"
import { emptize } from "./utils"
import { stackedKey, defaultCtx } from "./consts"

emptize(classNaming)
emptize(_classNaming)

export type { ClassNames, ClassHash, ClassNamesProperty, ClassNamed } from "./defs"
export default classNaming
export {classNamesCheck} from "./check"

/**
 * Makes `className` string or settle context
 * @example
 *   // To set context
 *   const classes = classNaming({classnames, className})
 * 
 *   // Using in Components
 *   <div {...classNaming(...)} data-block={`${classNaming(...)}`} />
 *   <Component {...{
 *     ...classNaming(...)},
 *     ...classnames
 *   }/>
 * 
 *   // With destructed `classnames`
 *   classNaming(className?, {App__Container, App__Item})} />
 *   
 *   // Toggler
 *   classNaming(true?, {Btn_Float: true, Btn___disabled: false})

 *   // Pipe-able
 *   const Cell = classNaming(className), Col1 = Cell({Column_1})
 *   <div {...Col1({Row_1})} />
 */

function classNaming<
  //TODO #8 `extends ReactRelated`
  Source extends CssModule
>(
  arg0: ClassNamingContext<Source> | (string | true | ActionsMap<Source>), 
  arg1?: [Extract<typeof arg0, true | string>] extends [never] ? never : ActionsMap<Source>
) {
  if (arg0 !== null && typeof arg0 === "object" && "classnames" in arg0) {
    const {classnames, className: cn} = arg0
    if (classnames !== null && typeof classnames === "object") {
      emptize(classnames)
      
      const className = typeof cn === "string" ? cn : undefined
      , host: ClassNamingCall<Source> = _classNaming.bind({
        classnames,
        className,
        [stackedKey]: undefined
      })

      return wrapper(host, className)
    } 
  } 

  return _classNaming.call(
    defaultCtx,
    //@ts-expect-error TS forgets about previous `if`
    arg0, // as Exclude<typeof arg0, ClassNamingContext<Source>>,
    arg1
  )
}

function _classNaming<
  //TODO #8 `extends ReactRelated`
  Source extends CssModule
>(
  this: ClassNamingThis<Source>,
  arg0?: string | true | ActionsMap<Source>,
  arg1?: [Extract<typeof arg0, true|string>] extends [never] ? never : ActionsMap<Source>
): ClassNaming<Source> {
  const {
    className,
    classnames,
    [stackedKey]: preStacked,
  } = this
  , withPropagation = arg0 === true  
  , source = typeof arg0 === "object" ? arg0 as ActionsMap<Source>: arg1
  , allowed = source && resolver(classnames, source)
  , withInjection = typeof arg0 !== "string" ? preStacked : joinWithLead(preStacked, arg0)
  , stacked = joinWithLead(withInjection, allowed)
  , result = joinWithLead(withPropagation && className, stacked)
  , host: ClassNamingCall<Source> = _classNaming.bind({classnames, className, [stackedKey]: stacked})

  emptize(classnames)

  return wrapper(
    host,
    result,
  )
}   

