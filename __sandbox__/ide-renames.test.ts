// import { Component } from "react"
// import type { ClassHash, ClassNames } from "../src/defs"

export {}

type ClassnamesProp<T extends Record<string, unknown>> = {classnames: T}

type WithClassNamed<K extends string = string> = {classnames: Record<K, unknown>}
interface Keying<T extends WithClassNamed> {
  (source: Partial<T["classnames"]>) : string
}

it("+ rename with function generic inheritance", () => {
  function keying<T extends WithClassNamed>(source: Partial<T["classnames"]>) {
    return Object.keys(source).join(" ")
  }

  function keyingCreator<T extends WithClassNamed>()  {
    const lambda: Keying<T> = source => Object.keys(source).join(" ")
    return lambda
  }
  
  type ParentProps = ChildProps & ClassnamesProp<{
    parent1: string
  }>
  
  function Parent({classnames, classnames: {
    parent1,
    renamed: child1
  }}: ParentProps) {
    return `${keying<ParentProps>({
      parent1,
      renamed: child1
    })} ${Child({classnames})}`
  }
  
  type ChildProps = ClassnamesProp<{
    renamed: string
    child2: string
  }>
  
  function Child({classnames: {
    renamed: child1,
    child2
  }}: ChildProps) {
    const k = keyingCreator<ChildProps>()
    return k({
      renamed: child1,
      child2
    })
  }

  expect(
    Parent({classnames: {}} as ParentProps)
  ).toBe(
    "parent1 renamed renamed child2"
  )
})

it("- rename from bind", () => {
  function keyingCtx<K extends string, T extends WithClassNamed<K>>(this: T, source: Partial<T["classnames"]>) {
    return Object.keys(source).join(" ")
  }

  type ParentProps = ChildProps & {
    classnames: {
      parent1: string
    }
  }
  
  function Parent(props: ParentProps) {
    const k = keyingCtx.bind(props)
    , {
      parent1,
      renamed_whatever: child1
    } = props.classnames
    
    return `${k({
      parent1,
      renamed: child1
    })} ${Child(props)}`
  }
  
  type ChildProps = {
    classnames: {
      renamed_whatever: string
      child2: string
    }
  }
  
  function Child(props: ChildProps) {
    const k = keyingCtx.bind(props)
    , {
      renamed_whatever: child1,
      child2  
    } = props.classnames
       
    return k({
      renamed: child1,
      child2
    })
  }

  expect(
    Parent({classnames: {}} as ParentProps)
  ).toBe(
    "parent1 renamed renamed child2"
  )
})

it("rename keys as string(-) or same shape object(+)", () => {
  function keyer<T extends WithClassNamed>(...keys: (keyof T["classnames"])[]) {
    return keys.join(" ")
  }
  
  function keyShape<T extends WithClassNamed>(toggler: {[K in keyof T["classnames"]]?: boolean}) {
    return Object.keys(toggler)
    .filter(key => toggler[key])
    .join(" ")
  }
  

  type ParentProps = ChildProps & ClassnamesProp<{
    parent1: string
  }>
  
  function Parent(props: ParentProps) {
    return `${keyShape<ParentProps>({
      parent1: true,
      renamed: true,
      child2: false
    })} ${Child(props)}`
  }
  
  type ChildProps = ClassnamesProp<{
    renamed: string
    child2: string
  }>
  
  function Child(_: ChildProps) {
    return keyer<ChildProps>(
      //@ts-expect-error
      "child1",
      "child2"
    )
  }

  expect(
    Parent({classnames: {}} as ParentProps)
  ).toBe(
    "parent1 renamed child1 child2"
  )  
})

// it("rename throw ts expressions", () => {
//   type Props = ClassnamesProp<{
//     prop1: ClassHash
//     prop2: ClassHash
//   }>
  
//   function Func1(_:ClassnamesProp<{
//     fn1: ClassHash
//     fn2: ClassHash
//   }>) {
//     return null  
//   }

//   class Comp1 extends Component<ClassnamesProp<{
//     class1: ClassHash
//     class2: ClassHash
//   }>> {}

//   const flatCollected
//   : ClassNames<Props, typeof Func1, typeof Comp1> = {classnames: {
//   // : (GetProps<Props> & GetProps<typeof Func1> & GetProps<typeof Comp1>)["classnames"] = {
//     class1: undefined,
//     class2: undefined,
//     fn1: undefined,
//     fn2: undefined,
//     prop1: undefined,
//     prop2: undefined,
//   }}

//   expect(Object.keys(flatCollected).join(" ")).toBe(
//     "class1 class2 fn1 fn2 prop1 prop2"
//   )
// })
