import type { JSXElementConstructor } from "react"

/** Multipurpose generic
 * @example ClassNames<true> === {className: string}
 * @example ClassNames<"class1"|"class2"> === {classNames: {class1: undefined|string, class2: undefined|string}}
 * @example ClassNames<Props1, Props2> === {classNames: Props1["classNames"] & Props2["classNames"]}
 * @example ClassName<true, "class1", typeof Component1> = {className: string, classNames: {class1: undefined|string} & Component1ClassNames} 
 */
export type ClassNames<
  C0 extends true|string,
  C1 extends (C0 extends true ? string : never) = never
>
= C0 extends true ? ClassNamesStrict<C0, C1>
: C0 extends string ? ClassNamesStrict<never, C0>
: never

export type ClassNamesStrict<C0 extends true | never, C1 extends string | never = never,
C2=never,
C3=never,
C4=never,
C5=never,
C6=never,
C7=never,
C8=never,
C9=never,
C10=never,
C11=never>
= Ever<C0, {className: string}> & ClassNamesProp<C1
| GetClassKeys<C2>
| GetClassKeys<C3>
| GetClassKeys<C4>
| GetClassKeys<C5>
| GetClassKeys<C6>
| GetClassKeys<C7>
| GetClassKeys<C8>
| GetClassKeys<C9>
| GetClassKeys<C10>
| GetClassKeys<C11>
>

export type ClassNamesFrom<
C1 extends ReactRelated,
C2 extends ReactRelated = never,
C3 extends ReactRelated = never,
C4 extends ReactRelated = never,
C5 extends ReactRelated = never,
C6 extends ReactRelated = never,
C7 extends ReactRelated = never,
C8 extends ReactRelated = never,
C9 extends ReactRelated = never,
C10 extends ReactRelated = never
> = ClassNamesStrict<never, never, C1, C2, C3, C4, C5, C6, C7, C8, C9, C10>

export type ReactRelated = Record<string, any> | JSXElementConstructor<any>

export type ClassNamesProp<C extends string = string> = Ever<C, {classNames: ClassNamesMap<C>}>

export type ClassNamesMap<C extends string> = Record<C, undefined|string>

type GetProps<C> = C extends JSXElementConstructor<infer P> ? P : C
type GetClassNames<T, K = "classNames", D = EmptyObject> = [T] extends [never] ? D : K extends keyof T ? T[K] : never
export type GetClassKeys<C> = keyof GetClassNames<GetProps<C>>

type Ever<T, V> = [T] extends [never] ? EmptyObject : V
type EmptyObject = Record<never, never>
