export type { ClassNames } from "./defs"
import { dehash, wrapper, joinWithLead } from "./core"
import type { ClassNamesMap, ClassNamed, GetClassKeys, ClassValue, ReactRelated } from "./defs"

type ClassNamingChain = ClassNamingCall & {
  className: string
}
type ClassNamingCall = (classes: Record<string, ClassValue>) => ClassNamingChain

export default classNamingBasic

/**
 * Makes `className` string from imported CSS
 * @example <div className={`${classNamingBasic({ClassName})}`} />
 * @example <div {...classNamingBasic({ClassName})} />
 * @example const cn = classNamingBasic({C1})({C2}); <div {...cn({C3})({C4})} />
 */
function classNamingBasic<Source extends ReactRelated>(
  classnames: ClassNamesMap<GetClassKeys<Source>>
): ClassNamingChain

/**
 * Makes `className` string from imported CSS
 * @example <div className={`${classNamingBasic({ClassName})}`} />
 * @example <div {...classNamingBasic({ClassName})} />
 * @example const cn = classNamingBasic({C1})({C2}); <div {...cn({C3})({C4})} />
 */
function classNamingBasic<Source extends ReactRelated>(
  propagatedClassName: undefined|string,
  classnames: ClassNamesMap<GetClassKeys<Source>>
): ClassNamingChain

function classNamingBasic(
  arg0: undefined|string|ClassNamesMap<string>,
  arg1: undefined|ClassNamesMap<string> = undefined
): ClassNamed {
  const classnames = typeof arg0 === "object" ? arg0 : arg1
  , className = typeof arg0 === "object" ? undefined : arg0

  //TODO remove `!`
  return _classNaming(classnames!, className)
}

function _classNaming<C extends ClassNamesMap<string>>(
  classes: C,
  propagate: undefined|string,
) : ClassNamingChain {
  //TODO `classes && dehash(classes)`
  const className = joinWithLead(propagate, dehash(classes))  
  , host: ClassNamingCall = classes => _classNaming(classes, className)

  return wrapper(host, className)
}
