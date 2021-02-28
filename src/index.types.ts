import type { stackedKey } from "./consts"
import type { ClassNamed, CssModule, ClassHash } from "./defs"

export interface ClassNamingCall<
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
export interface ClassNaming<Source extends CssModule> extends ClassNamed, ClassNamingCall<Source> {}

export type ClassNamingThis<Source extends CssModule> = ClassNamingContext<Source> & {
  [stackedKey]: string|undefined
}

export type ClassNamingContext<T extends CssModule> = Partial<ClassNamed> & {
  //TODO Reuse `ClassNamesProperty`?
  classnames: T
}

export type ActionsMap<K extends CssModule> = {[k in keyof K]?: ClassHash|boolean}
// type SubMap<K extends ClassNamesMap> = {[k in keyof K]?: ClassHash}
// type ToggleMap<K extends ClassNamesMap> = {[k in keyof K]?: boolean}
