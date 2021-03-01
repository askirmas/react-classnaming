import type {
  JSXElementConstructor,
  ReactElement,
  Component
} from "react"

/** Collect required `classnames` from used sub-Components
 * @example
 * ClassNames<true> // {className: string}
 * ClassNames<Props1> // {classnames: Props1["classnames"] & Props2["classnames"]}
 * ClassNames<typeof Component>
 * ClassNames<true, Props, typeof ClassComponent, typeof FunctionalComponent>
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
& ClassNamesCombiner<
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

/** Declaration of self Component's `classnames`
 * @example
 * ClassNames<{class1: ClassHash, class2: ClassHash}>
 * ClassNames<typeof some_module_css, {class1: ClassHash, class2: ClassHash}>
*/
export type ClassNamesProperty<
C extends CssModule, T extends {[K in keyof C]?: ClassHash} = C
> = {classnames: {[K in keyof T & keyof C]: ClassHash}}

/** Primitive for global CSS and CSS module */
export type ClassHash = undefined|string

export type Action = ClassHash|boolean

/** Shortcut to require property `className` */
export type ClassNamed = {
  className: string
}


/// iNTERNAL
type ClassNamesCombiner<C extends CssModule> = Ever<C, Ever<keyof C, {classnames: {[K in keyof C]: ClassHash}}>>
type WithClassNames = {classnames: CssModule}

export type CssModule = Record<string, ClassHash>
//TODO Consider not empty object
export type GetClassNames<T, D = EmptyObject, R = never> = [T] extends [never] ? D : "classnames" extends keyof T ? T["classnames"] : R

/// UTILITIES FOR REACT

export type ClassNamesFrom<T, D = EmptyObject> = GetClassNames<GetProps<T>, D, EmptyObject>
export type GetProps<C> = C extends JSXElementConstructor<infer P> ? P : C

/// REACT

export type ReactRelated = (AnyObject & WithClassNames) | RFC | RCC
//TODO Is there any way to require `classnames` in FC `props`?
type RFC = (props: any) => ReactElement<any, any> | null
type RCC = new (props: any) => Component<AnyObject & WithClassNames, any>

/// UTILITY TYPES

type Ever<T, V> = [T] extends [never] ? EmptyObject : V
type EmptyObject = Record<never, never>
type AnyObject = {[k: string]: any}
export type Falsy = undefined|null|false|0|""
// export type Part<T> = {[K in keyof T]: T[K] | undefined}
// type get<T, K> = K extends keyof T ? T[K] : never
export type RequiredKeys<T> = { [K in keyof T]-?:
  ({} extends { [P in K]: T[K] } ? never : K)
}[keyof T]