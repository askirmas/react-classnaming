export type Ever<T, V, D = EmptyObject> = [T] extends [never] ? D : V
export type Ever0<T, D = never> = [T] extends [never] ? D : T
export type EmptyObject = Record<never, never>
export type AnyObject = Record<string, any>
export type Falsy = undefined|null|false|0|""
// export type Part<T> = {[K in keyof T]: T[K] | undefined}
// type get<T, K> = K extends keyof T ? T[K] : never

/** @see https://stackoverflow.com/a/49579497/9412937 */
export type RequiredKeys<T> = { [K in keyof T]-?:
  ({} extends { [P in K]: T[K] } ? never : K)
}[keyof T]

export type BoolDict = Record<string, boolean>

/** @see https://github.com/microsoft/TypeScript/issues/31153#issuecomment-487872268 */
export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends {[_ in keyof T]: infer U} ? U : never;

export type OmitIndexed<T> = Pick<T, KnownKeys<T> & keyof T>

export type Primitive = undefined | null | boolean | number | string | symbol | bigint

export type Strip<Str extends string, Delimiter extends string, toNever extends boolean = false>
= Str extends `${infer Lead}${Delimiter}${string}` ? Lead : toNever extends false ? Str : never
export type Cut<Str extends string, Delimiter extends string, toNever extends boolean = false
> = Str extends `${string}${Delimiter}${infer Back}` ? Back : toNever extends false ? Str : never
export type NoSubString<Str extends string, Sub extends string> = Exclude<Str, `${string}${Sub}${string}`>

export type Subest<Extended, Base> = string extends keyof Base
? Extended
: Base extends Extended
  ? Extended
  : {[K in keyof Base]?: Base[K]}

export type Extends<T, V, X> = [T extends V ? true : never] extends [never] ? never : X

export type PartDeep<T> = Exclude<T, AnyObject>
| Extract<T, any[]>
//TODO For #42 maybe | (T extends any[] ? PartDeep<Extract<T, any[]>[number]>[] : never)
| (
  T extends any[]
  ? never
  : T extends AnyObject
    ? Ever<keyof Extract<Exclude<T, any[]>, AnyObject>,
      {[K in keyof Extract<Exclude<T, any[]>, AnyObject>]?: PartDeep<Extract<Exclude<T, any[]>, AnyObject>[K]>},
      never
    >
    : never
)

export type KeyOf<T> = [T] extends [never] ? never : T extends AnyObject ? Extract<keyof T, string> : never

/** @see https://stackoverflow.com/a/50375286/10325032 */
export type UnionToIntersection<Union> = (
  Union extends any ? (argument: Union) => void : never
) extends (argument: infer Intersection) => void
? Intersection
: never;

export type After<Str extends string, Start extends string> = Str extends `${Start}${infer End}` ? End : never
