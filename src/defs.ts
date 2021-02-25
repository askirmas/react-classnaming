import type { JSXElementConstructor } from "react"

/** Multipurpose generic
 * @example ClassNames<true> === {className: string}
 * @example ClassNames<"class1"|"class2"> === {classnames: {class1: undefined|string, class2: undefined|string}}
 * @example ClassNames<Props1, Props2> === {classnames: Props1["classnames"] & Props2["classnames"]}
 * @example ClassNames<true, "class1", Props, typeof Component1, typeof FunctionalComponent>
 */
//TODO Consider string | ClassNamesMap
export type ClassNames<
  C0 extends true | ReactRelated,
  C1 extends ReactRelated = never,
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
  | GetClassKeys<Extract<C0, ReactRelated>>
>
& ClassNamesProperty<
  // & Ever<Extract<C0, ReactRelated>, ClassNamesFrom<Extract<C0, ReactRelated>>>
  & Ever<C1, ClassNamesFrom<C1>>
  & Ever<C2, ClassNamesFrom<C2>>
  & Ever<C3, ClassNamesFrom<C3>>
  & Ever<C4, ClassNamesFrom<C4>>
  & Ever<C5, ClassNamesFrom<C5>>
  & Ever<C6, ClassNamesFrom<C6>>
  & Ever<C7, ClassNamesFrom<C7>>
  & Ever<C8, ClassNamesFrom<C8>>
  & Ever<C9, ClassNamesFrom<C9>>
  & Ever<C10, ClassNamesFrom<C10>>
>

export type ClassNamed = {
  className: string
}

export type ClassNamer<ClassKeys extends string> = {
  className?: undefined|string
  classnames: ClassNamesMap<ClassKeys>
}

export type ReactRelated = Record<string, any> | JSXElementConstructor<any>

export type ClassNamesProperty<C extends ClassNamesMap<string>> = Ever<C, Ever<keyof C, {classnames: C}>>

export type ClassNamesProp<C extends string> = Ever<C, {classnames: ClassNamesMap<C>}>

export type ClassValue = undefined|string

export type ClassNamesMap<C extends string> = Record<C, ClassValue>

export type GetProps<C> = C extends JSXElementConstructor<infer P> ? P : C
//TODO Consider not empty object
export type GetClassNames<T, D = EmptyObject, R = never> = [T] extends [never] ? D : "classnames" extends keyof T ? T["classnames"] : R
type GetClassKeys<C> = [GetClassNames<GetProps<C>, never>] extends [never] ? never : keyof GetClassNames<GetProps<C>>

type Ever<T, V> = [T] extends [never] ? EmptyObject : V
export type EmptyObject = Record<never, never>

export type Falsy = undefined|null|false|0|""

export type ToggleMap<K extends string> = Partial<Record<K, true|Falsy>>

// type get<T, K> = K extends keyof T ? T[K] : never

type ClassNamesFrom<T, D = EmptyObject> = GetClassNames<GetProps<T>, D, EmptyObject>
