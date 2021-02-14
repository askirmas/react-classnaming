import type { JSXElementConstructor } from "react"

export type ClassNames<C extends string> = {
  classNames: ClassNamesMap<C>
}

export type ClassName = {
  className: string
  toString: () => string
}

export type ClassNamesMap<C extends string> = Record<C, undefined|string>

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

type GetProps<C> = C extends JSXElementConstructor<infer P> ? P : C
type GetClassNames<T, K = "classNames", D = EmptyObject> = [T] extends [never] ? D : K extends keyof T ? T[K] : never
type GetClassNamesProp<C> = GetClassNames<GetProps<C>>
type EmptyObject = Record<never, never>
