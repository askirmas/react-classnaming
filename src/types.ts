import type {
  Ever,
  EmptyObject,
} from "./ts-swiss.defs"
import type {
  GetProps,
} from "./react-swiss.defs"
import type {
  ClassNamesCombiner,
  ReactRelated,
  GetClassNames,
  CssModule,
  ClassHash
} from "./definitions.defs"

export type {
  ClassHash
} from "./definitions.defs"

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

/** Shortcut to require property `className` */
export type ClassNamed = {
  className: string
}


// TODO Consider `never` if no `"classnames"` key
/**
 * Obtain `classnames`-object from `props` of functional component, class component or props type
 * @example
 * ```typescript
 * ClassNamesFrom<ComponentProps>;
 * ClassNamesFrom<typeof Component>;
 * ```
 */
export type ClassNamesFrom<C extends ReactRelated> = GetClassNames<GetProps<C>, EmptyObject, EmptyObject>
