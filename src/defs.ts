import type { JSXElementConstructor } from "react"

export type ClassNames<C extends string> = {
  classNames: ClassNamesMap<C>
}

export type ClassName = {
  className: string
  toString: () => string
}

export type ClassNamesFrom<C>
= Picker<C extends JSXElementConstructor<infer P> ? P : C, "classNames">
//TODO PropsWithClassNames<C> that omits `className`

export type ClassNamesMap<C extends string> = Record<C,
  undefined
  |string
  //TODO ? `|boolean`
>

type Picker<T, K> = K extends keyof T ? Pick<T, K> : never
