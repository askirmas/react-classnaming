export type { ClassNames } from "./defs"
import { wrapper, joinWithLead, resolver } from "./core"
import type { ClassNamesMap, ClassNamed, ClassHash, ReactRelated, GetClassNames, GetProps } from "./defs"

type ClassNamingChain = ClassNamingCall & ClassNamed
type ClassNamingCall = (classes: Record<string, ClassHash>) => ClassNamingChain

export default classNamingBasic

/**
 * Makes `className` string from imported CSS
 * @example <div className={`${classNamingBasic({ClassName})}`} />
 * @example <div {...classNamingBasic({ClassName})} />
 * @example const cn = classNamingBasic({C1})({C2}); <div {...cn({C3})({C4})} />
 */
function classNamingBasic<Source extends ReactRelated>(
  classnames: GetClassNames<GetProps<Source>>
): ClassNamingChain

/**
 * Makes `className` string from imported CSS
 * @example <div className={`${classNamingBasic({ClassName})}`} />
 * @example <div {...classNamingBasic({ClassName})} />
 * @example const cn = classNamingBasic({C1})({C2}); <div {...cn({C3})({C4})} />
 */
function classNamingBasic<Source extends ReactRelated>(
  propagatedClassName: undefined|string,
  classnames: GetClassNames<GetProps<Source>>
): ClassNamingChain

function classNamingBasic(
  arg0: undefined|string|ClassNamesMap,
  arg1: undefined|ClassNamesMap = undefined
): ClassNamed {
  const classnames = typeof arg0 === "object" ? arg0 : arg1
  , className = typeof arg0 === "object" ? undefined : arg0

  //TODO remove `!`
  return _classNaming(classnames!, className)
}

function _classNaming<C extends ClassNamesMap>(
  classes: C,
  propagate: undefined|string,
) : ClassNamingChain {
  //TODO `classes && dehash(classes)`
  const className = joinWithLead(propagate, resolver(undefined, classes))  
  , host: ClassNamingCall = classes => _classNaming(classes, className)

  return wrapper(host, className)
}
