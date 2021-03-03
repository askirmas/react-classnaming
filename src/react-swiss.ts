import type {
  AnyObject,
} from "./ts-swiss"
import type {
  JSXElementConstructor,
  ReactElement,
  Component
} from "react"

export type GetProps<C> = C extends JSXElementConstructor<infer P> ? P : C

//TODO Is there any way to require `classnames` in FC `props`?
export type RFC = (props: any) => ReactElement<any, any> | null
export type RCC<P> = new (props: any) => Component<AnyObject & P, any>
