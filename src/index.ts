import type { ClassNamingContext, ClassNamed, CssModule, ClassHash } from "./defs"
import {joinWithLead, resolver, wrapper} from "./core"
import { emptize } from "./utils"

const stackedKey = Symbol("stacked")

emptize(classNaming)

export type { ClassNames, ClassHash, ClassNamesProperty, ClassNamed } from "./defs"
export default classNaming
export {classNamesCheck} from "./check"

interface ClassNamingCall<
  //TODO #8 `extends ReactRelated`
  Source extends CssModule
> {
/**
  * Makes `className` string
  * @example
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
  (
    arg0?: ClassNamingContext<Source> | true | string | ActionsMap<Source>,
    arg1?: [Extract<typeof arg0, true|string>] extends [never]
    ? never 
    : ActionsMap<Source>
  ): ClassNaming<Source>
  // Using overloads will make error not in certain argument but on all call - 'No overload found'
  // (propagateClassName: true): ClassNaming<Source>
  // (expression: ToggleMap<Source>): ClassNaming<Source>
  // (propagateClassName: true, expression: ToggleMap<Source>): ClassNaming<Source>
}

//TODO #11 no `className` - no first `true`
interface ClassNaming<Source extends CssModule> extends ClassNamed, ClassNamingCall<Source> {}

type ClassNamingThis<Source extends CssModule> = ClassNamingContext<Source> & {
  [stackedKey]: string|undefined
}

type ActionsMap<K extends CssModule> = {[k in keyof K]?: ClassHash|boolean}
// type SubMap<K extends ClassNamesMap> = {[k in keyof K]?: ClassHash}
// type ToggleMap<K extends ClassNamesMap> = {[k in keyof K]?: boolean}

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
  this: void | ClassNamingThis<Source>,
  // TODO #13 arg0?: typeof this extends void ? ClassNamingContext<Source> : (true | ToggleMap<Source>),
  // TODO #13 arg1?: typeof this extends void ? never : typeof arg0 extends true ? ToggleMap<Source> : never,
  arg0?: ClassNamingContext<Source> | (string | true | ActionsMap<Source>),
  arg1?: [Extract<typeof arg0, true|string>] extends [never] ? never : ActionsMap<Source>
): ClassNaming<Source> {
  // istanbul ignore next //TODO #13 Solve TS tricks with context
  const thisArg = this || {}
  
  context_assign:
  if (
    !(stackedKey in thisArg)
    && typeof arg0 === "object"
  ) {
    const {classnames, className} = arg0 // as ClassNamingContext<Source>
    if (
      classnames !== null && typeof classnames === "object"
      && (
        className === undefined  || typeof className === "string" 
      )  
    ) {
      emptize(classnames)
      const host: ClassNamingCall<Source> = classNaming.bind({classnames, className, [stackedKey]: undefined}) 

      return wrapper(host, className)
    }
  }

  const {
    className,
    classnames,
    [stackedKey]: preStacked,
  } = thisArg as ClassNamingThis<Source>
  , withPropagation = arg0 === true  
  , source = typeof arg0 === "object" ? arg0 as ActionsMap<Source>: arg1
  , allowed = source && resolver(classnames, source)
  , withInjection = typeof arg0 !== "string" ? preStacked : joinWithLead(preStacked, arg0)
  , stacked = joinWithLead(withInjection, allowed)
  , result = joinWithLead(withPropagation && className, stacked)
  , host: ClassNamingCall<Source> = classNaming.bind({classnames, className, [stackedKey]: stacked})

  classnames && emptize(classnames)

  return wrapper(
    host,
    result,
  )
}   

