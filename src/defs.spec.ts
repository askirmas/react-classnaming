import { Component } from "react";
import type { ClassNames } from "./defs";

type ClassNamesSingleton<C extends string> = {classNames: Record<C, string|undefined>}

class ClassComponent extends Component<ClassNamesSingleton<"component">> {}
class ClassPureComponent extends Component<ClassNamesSingleton<"pureComponent">> {}
function Functional(_: ClassNamesSingleton<"functional">) {
  return null
}
type ComponentProps= ClassNamesSingleton<"props">


describe("ClassNames", () => {
  it("<true>", () => {
    const suites: Record<string, ClassNames<true>> = {
      "className only": {className: ""},
      //@ts-expect-error Property 'className' is missing
      "empty object"
      : {},
      "classNames only": {
        //@ts-expect-error Object literal may only specify known properties, but 'classNames' does not exist
        classNames: {}
      },
      "className and classNames": {
        className: "",
        //@ts-expect-error Object literal may only specify known properties, but 'classNames' does not exist
        classNames: {}
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })

  it("<'class1'|'class2'>", () => {
    const suites: Record<string, ClassNames<"class1"|"class2">> = {
      "omitted": {
        //@ts-expect-error ReactRelated
        classNames: {
          class1: undefined
        }
      },
      "classNames only": {
        classNames: {class1: undefined, class2: undefined}
      },
      "className only": {
        //@ts-expect-error Object literal may only specify known properties, but 'className' does not exist
        className: ""
      },
      //@ts-expect-error Property 'classNames' is missing
      "empty object"
      : {},
      "className and classNames": {
        //@ts-expect-error Object literal may only specify known properties, but 'className' does not exist
        className: "",
        classNames: {class1: undefined, class2: undefined}
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })

  it("<true, 'class1'|'class2'>", () => {
    const suites: Record<string, ClassNames<true, "class1"|"class2">> = {
      "className and classNames": {
        className: "",
        classNames: {class1: undefined, class2: undefined}
      },
      //@ts-expect-error Property 'className' is missing
      "classNames only": {
        classNames: {class1: undefined, class2: undefined}
      },
      //@ts-expect-error Property 'classNames' is missing
      "className only": {
        className: ""
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })
})
describe("", () => {
  it("<'class1', true>", () => {
    const suite1
    //@ts-expect-error Type 'boolean' does not satisfy the constraint 'never'
    : ClassNames<"class1", true>
    = {classNames: {"class1": undefined}}

    expect(suite1).toBeInstanceOf(Object)
  })

  it("<true, true>", () => {
    const suite1
    : ClassNames<true,
      //@ts-expect-error Type 'boolean' does not satisfy the constraint 'never'
      true
    > = {
      className: ""}

    expect(suite1).toBeInstanceOf(Object)
  })

  it("<'class1', 'class2'>", () => {
    const suite1
    : ClassNames<"class1",
      //@ts-expect-error Type 'string' does not satisfy the constraint 'never'
      "class2"
    >
    = {classNames: {"class1": undefined, class2: undefined}}

    expect(suite1).toBeInstanceOf(Object)
  })

})

describe("ClassNamesFrom", () => {

  it("manually merge", () => {
    type AppClassNames = (
      ClassNamesSingleton<"App">
      & ClassNames<typeof ClassComponent>
      & ClassNames<typeof ClassPureComponent>
      & ClassNames<typeof Functional>
      & ClassNames<ComponentProps>
    )["classNames"];
  
    const suites: Record<string, AppClassNames> = {
      "exact": {
        App: undefined,
        component: undefined,
        functional: undefined,
        props: undefined,
        pureComponent: undefined
      },
      "redundant": {
        //@ts-expect-error Object literal may only specify known properties, and 'redundant' does not exist
        redundant: undefined,
        App: undefined,
        component: undefined,
        functional: undefined,
        props: undefined,
        pureComponent: undefined,
      },
      //@ts-expect-error Property 'App' is missing
      "missed App": {
        component: undefined,
        functional: undefined,
        props: undefined,
        pureComponent: undefined,
      },
      //@ts-expect-error Property 'component' is missing
      "missed component": {
        App: undefined,
        functional: undefined,
        props: undefined,
        pureComponent: undefined,
      },
      //@ts-expect-error Property 'pureComponent' is missing
      "missed pureComponent": {
        App: undefined,
        component: undefined,
        functional: undefined,
        props: undefined,
      },
      //@ts-expect-error Property 'functional' is missing 
      "missed functional": {
        App: undefined,
        component: undefined,
        props: undefined,
        pureComponent: undefined,
      },
      //@ts-expect-error Property 'props' is missing
      "missed props": {
        App: undefined,
        component: undefined,
        functional: undefined,
        pureComponent: undefined,
      }
    }
    
    expect(suites).toBeInstanceOf(Object)
  })

  it("multiple apply", () => {
    type AppClassnames = ClassNames<
        "App",
        typeof ClassComponent,
        typeof ClassPureComponent,
        typeof Functional,
        ComponentProps
    >["classNames"];

    const suites: Record<string, AppClassnames> = {
      "exact": {
        App: undefined,
        component: undefined,
        functional: undefined,
        props: undefined,
        pureComponent: undefined
      }
    }

    expect(suites).toBeInstanceOf(Object)
  })
})
