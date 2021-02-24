export type { ClassNames } from "./defs"
import { dehash, wrapper } from "./core"
import type { ClassNamesMap, ClassNamed, GetClassKeys } from "./defs"

export default classNamingBasic

/**
 * Makes `className` string from imported CSS
 * @example <div className={classNaming<string>({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 */
function classNamingBasic<Return, ClassKeys extends string = string>(
  classnames: ClassNamesMap<string extends Return ? ClassKeys : GetClassKeys<Return>>
): Return extends string ? string : ClassNamed

/**
 * Makes `className` string from imported CSS
 * @example <div className={classNaming<string>({ClassName})} />
 * @example <div {...classNaming({ClassName})} />
 */
function classNamingBasic<Return, ClassKeys extends string = string>(
  propagatedClassName: undefined|string,
  classnames: ClassNamesMap<string extends Return ? ClassKeys : GetClassKeys<Return>>
): Return extends string ? string : ClassNamed

function classNamingBasic(
  arg0: undefined|string|ClassNamesMap<string>,
  arg1: undefined|ClassNamesMap<string> = undefined
): ClassNamed {
  const classnames = typeof arg0 === "object" ? arg0 : arg1
  , className = typeof arg0 === "object" ? undefined : arg0

  return _classNaming(classnames!, className, {})
}

function _classNaming<T extends Partial<ClassNamed>>(
  classnames: ClassNamesMap<string>,
  className: undefined|string,
  destination: T
): T & ClassNamed {
  
  // TODO For propagation
  // $defineProperty(
  //   classnames,
  //   "toString",
  //   {
  //     value: undefined
  //   }
  // )
  // $assign(destination, {classnames})

  return wrapper(className, dehash(classnames), destination)
}
