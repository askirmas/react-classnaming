import type { JSXElementConstructor } from "react"

/** Multipurpose generic
 * @example ClassNames<true> === {className: string}
 * @example ClassNames<"class1"|"class2"> === {classNames: {class1: undefined|string, class2: undefined|string}}
 * @example ClassNames<Props1, Props2> === {classNames: Props1["classNames"] & Props2["classNames"]}
 * @example ClassName<true, "class1", typeof Component1> = {className: string, classNames: {class1: undefined|string} & Component1ClassNames} 
 */
export type ClassNames<C0 extends true|string, C1 extends (C0 extends true ? string : never) = never>
= C0 extends true ? ClassNamesSimple<C0, C1>
: C0 extends string ? ClassNamesSimple<never, C0>
: never

type ClassNamesSimple<C0 extends true | never, C1 extends string | never>
= Ever<C0, {className: string}> & Ever<C1, {"classNames": ClassNamesMap<C1>}>
type Ever<T, V> = [T] extends [never] ? EmptyObject : V

// type ClassNamesSingleton<C>
// = [C] extends [never]
// ? EmptyObject
// : C extends string
// ? {classNames: ClassNamesMap<C>}
// : never

export type ClassNamesFrom<C1, C2=never, C3=never, C4=never, C5=never, C6=never, C7=never, C8=never, C9=never, C10=never> = {
  "classNames": GetClassNamesProp<C1>
  & GetClassNamesProp<C2>
  & GetClassNamesProp<C3>
  & GetClassNamesProp<C4>
  & GetClassNamesProp<C5>
  & GetClassNamesProp<C6>
  & GetClassNamesProp<C7>
  & GetClassNamesProp<C8>
  & GetClassNamesProp<C9>
  & GetClassNamesProp<C10>
}

export type ClassNamesMap<C extends string> = Record<C, undefined|string>

type GetProps<C> = C extends JSXElementConstructor<infer P> ? P : C
type GetClassNames<T, K = "classNames", D = EmptyObject> = [T] extends [never] ? D : K extends keyof T ? T[K] : never
type GetClassNamesProp<C> = GetClassNames<GetProps<C>>
type EmptyObject = Record<never, never>
