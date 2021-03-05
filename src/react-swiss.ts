import type {
  AnyObject,
} from "./ts-swiss"
import type {
  JSXElementConstructor,
  ReactElement,
  Component
} from "react"

export type GetProps<C> = PropsFrom<C, C>
type PropsFrom<Component, Default = never> = Component extends JSXElementConstructor<infer P> ? P : Default
//TODO Is there any way to require `classnames` in FC `props`?
export type RFC = (props: any) => ReactElement<any, any> | null
export type RCC<P> = new (props: any) => Component<AnyObject & P, any>
