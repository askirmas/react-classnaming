import type {
  Ever,
  EmptyObject,
  AnyObject,
} from "./ts-swiss"
import type {
  GetProps,
  RCC,
  RFC
} from "./react-swiss"

/** Collects required `classnames` from used sub-Components
 * @example
 * ```typescript
 * type Props = ClassNames<true> // {className: string}
 * type Props = ClassNames<Props> // {classnames: Props["classnames"]}
 * type Props = ClassNames<typeof Component>
 * type Props = ClassNames<true, Props, typeof ClassComponent, typeof FunctionalComponent>
 * ```
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
 * ```typescript
 *   type MyClasses = ClassNamesProperty<{
 *     class1: ClassHash
 *     class2: ClassHash
 *   }>
 * 
 *   type MyProps = ClassNamesProperty<
 *     typeof some_module_css,
 *     {class1: ClassHash, class2: ClassHash}
 *   >
 * ```
*/
export type ClassNamesProperty<
  C extends CssModule,
  T extends {[K in keyof C]?: ClassHash} & {[K in Exclude<keyof T, keyof C>]: never} = C & EmptyObject,
> = {classnames: {[K in keyof T & keyof C]: ClassHash}}

/** Primitive for global CSS and CSS module */
export type ClassHash = undefined|string

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

export type ActionsOf<Source extends CssModule> = {[K in keyof Source]?: Action}
export type Act4Used<A extends Action> = A extends ClassHash ? true : A
export type Action = ClassHash|boolean

/// UTILITIES FOR REACT

export type ClassNamesFrom<T, D = EmptyObject> = GetClassNames<GetProps<T>, D, EmptyObject>
export type ReactRelated = (AnyObject & WithClassNames) | RFC | RCC<WithClassNames>
