import type { JSXElementConstructor } from "react"

/** Multipurpose generic
 * @example ClassNames<true> === {className: string}
 * @example ClassNames<"class1"|"class2"> === {classnames: {class1: undefined|string, class2: undefined|string}}
 * @example ClassNames<Props1, Props2> === {classnames: Props1["classnames"] & Props2["classnames"]}
 * @example ClassNames<true, "class1", Props, typeof Component1, typeof FunctionalComponent>
 */
//TODO Consider string | ClassNamesMap
export type ClassNames<
  C0 extends true | string| ReactRelated,
  C1 extends (C0 extends true ? string : never) | ReactRelated = never,
  C2 extends ReactRelated = never,
  C3 extends ReactRelated = never,
  C4 extends ReactRelated = never,
  C5 extends ReactRelated = never,
  C6 extends ReactRelated = never,
  C7 extends ReactRelated = never,
  C8 extends ReactRelated = never,
  C9 extends ReactRelated = never,
  C10 extends ReactRelated = never
>
= Ever<Extract<C0, true>, {className: string}>
& ClassNamesProp<
  Extract<C0 | C1, string>
  | GetClassKeys<Extract<C0 | C1, ReactRelated>>
  | GetClassKeys<C2>
  | GetClassKeys<C3>
  | GetClassKeys<C4>
  | GetClassKeys<C5>
  | GetClassKeys<C6>
  | GetClassKeys<C7>
  | GetClassKeys<C8>
  | GetClassKeys<C9>
  | GetClassKeys<C10>  
>

export type ClassNamed = {
  className: string
  toString: () => string
}

export type ClassNamer<ClassKeys extends string> = {
  className?: undefined|string
  classnames: ClassNamesMap<ClassKeys>
}

export type ReactRelated = Record<string, any> | JSXElementConstructor<any>

export type ClassNamesProp<C extends string> = Ever<C, {classnames: ClassNamesMap<C>}>

export type ClassValue = undefined|string

export type ClassNamesMap<C extends string> = Record<C, ClassValue>

type GetProps<C> = C extends JSXElementConstructor<infer P> ? P : C
//TODO Consider not empty object
type GetClassNames<T, K = "classnames", D = EmptyObject> = [T] extends [never] ? D : K extends keyof T ? T[K] : never
export type GetClassKeys<C> = keyof GetClassNames<GetProps<C>>

type Ever<T, V> = [T] extends [never] ? EmptyObject : V
export type EmptyObject = Record<never, never>

export type Falsy = undefined|null|false|0|""

export type ToggleMap<K extends string> = Partial<Record<K, true|Falsy>>

// type get<T, K> = K extends keyof T ? T[K] : never
