import type {
  Ever,
  EmptyObject,
  AnyObject,
} from "./ts-swiss.types"
import type {
  RCC,
  RFC
} from "./react-swiss.types"

/** Primitive for global CSS and CSS module */
export type ClassHash = undefined|string

/// iNTERNAL
export type ClassNamesCombiner<C extends CssModule> = Ever<C, Ever<keyof C, {classnames: {[K in keyof C]: ClassHash}}>>
type WithClassNames = {classnames: CssModule}

export type CssModule = Record<string, ClassHash>
//TODO Consider not empty object
export type GetClassNames<T, D = EmptyObject, R = never> = [T] extends [never] ? D : "classnames" extends keyof T ? T["classnames"] : R

export type ActionsOf<Source extends CssModule> = {[K in keyof Source]?: Action}
export type Act4Used<A extends Action> = A extends ClassHash ? true : A
export type Action = ClassHash|boolean

export type ReactRelated = (AnyObject & WithClassNames) | RFC | RCC<WithClassNames>
