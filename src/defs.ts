import type {
  JSXElementConstructor,
  ReactElement,
  Component
} from "react"

/** Multipurpose generic
 * @example ClassNames<true> === {className: string}
 * @example ClassNames<"class1"|"class2"> === {classnames: {class1: undefined|string, class2: undefined|string}}
 * @example ClassNames<Props1, Props2> === {classnames: Props1["classnames"] & Props2["classnames"]}
 * @example ClassNames<true, "class1", Props, typeof Component1, typeof FunctionalComponent>
 */

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
= Ever<Extract<C0, true>, ClassNamed>
& ClassNamesProperty<
  & Ever<Extract<C0, ReactRelated>, ClassNamesFrom<Extract<C0, ReactRelated>>>
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

//TODO Add leading `map` to check
export type ClassNamesProperty<C extends ClassNamesMap> = Ever<C, Ever<keyof C, {classnames: {[K in keyof C]: ClassValue}}>>

export type ClassValue = undefined|string

export type ClassNamed = {
  className: string
}

/// APPLIED TO GLOBAL INLINE

export type ClassNamingContext<T extends ClassNamesMap> = Partial<ClassNamed> & {
  //TODO Reuse `ClassNamesProperty`?
  classnames: T
}
export type ToggleMap<K extends ClassNamesMap> = {[k in keyof K]?: boolean}

/// iNTERNAL

type WithClassNames = ClassNamesProperty<ClassNamesMap>

export type ClassNamesMap = Record<string, ClassValue>
//TODO Consider not empty object
export type GetClassNames<T, D = EmptyObject, R = never> = [T] extends [never] ? D : "classnames" extends keyof T ? T["classnames"] : R

/// UTILITIES FOR REACT

export type ClassNamesFrom<T, D = EmptyObject> = GetClassNames<GetProps<T>, D, EmptyObject>
export type GetProps<C> = C extends JSXElementConstructor<infer P> ? P : C

/// REACT

export type ReactRelated = (AnyObject & WithClassNames) | RFC | RCC
type RFC = (props: any) => ReactElement<any, any> | null
type RCC = new (props: any) => Component<AnyObject & WithClassNames, any>

/// UTILITY TYPES

type Ever<T, V> = [T] extends [never] ? EmptyObject : V
export type EmptyObject = Record<never, never>
type AnyObject = {[k: string]: any}
export type Falsy = undefined|null|false|0|""

// type get<T, K> = K extends keyof T ? T[K] : never
