import { Component, PureComponent } from "react";
import type { ClassNames } from "./defs";

type Props = ClassNames<true, "props">
function Functional(_: ClassNames<"functional">) { return null }
class ClassComponent extends Component<ClassNames<"component"|"comp0">> {}
class ClassPureComponent extends PureComponent<ClassNames<"pureComponent">> {}

describe("ClassNames", () => {
  it("<true>", () => {
    const suites: Record<string, ClassNames<true>> = {
      "className only": {className: ""},
      //@ts-expect-error Property 'className' is missing
      "empty object"
      : {},
      "classnames only": {
        //@ts-expect-error Object literal may only specify known properties, but 'classnames' does not exist
        classnames: {}
      },
      "className and classnames": {
        className: "",
        //@ts-expect-error Object literal may only specify known properties, but 'classnames' does not exist
        classnames: {}
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })

  it("<'class1'|'class2'>", () => {
    const suites: Record<string, ClassNames<"class1"|"class2">> = {
      "omitted": {
        //@ts-expect-error ReactRelated
        classnames: {
          class1: undefined
        }
      },
      "classnames only": {
        classnames: {class1: undefined, class2: undefined}
      },
      "className only": {
        //@ts-expect-error Object literal may only specify known properties, but 'className' does not exist
        className: ""
      },
      //@ts-expect-error Property 'classnames' is missing
      "empty object"
      : {},
      "className and classnames": {
        //@ts-expect-error Object literal may only specify known properties, but 'className' does not exist
        className: "",
        classnames: {class1: undefined, class2: undefined}
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })

  it("<true, 'class1'|'class2'>", () => {
    const suites: Record<string, ClassNames<true, "class1"|"class2">> = {
      "className and classnames": {
        className: "",
        classnames: {class1: undefined, class2: undefined}
      },
      //@ts-expect-error Property 'className' is missing
      "classnames only": {
        classnames: {class1: undefined, class2: undefined}
      },
      //@ts-expect-error Property 'classnames' is missing
      "className only": {
        className: ""
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })
})
describe("Miss-use", () => {
  it("<'class1', true>", () => {
    const suite1
    //@ts-expect-error Type 'boolean' does not satisfy the constraint 'never'
    : ClassNames<"class1", true>
    = {classnames: {"class1": undefined}}

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
    = {classnames: {"class1": undefined, class2: undefined}}

    expect(suite1).toBeInstanceOf(Object)
  })

})

describe("ClassNamesFrom", () => {

  it("manually merge", () => {
    type AppClassNames = (
      ClassNames<"App">
      & ClassNames<typeof ClassComponent>
      & ClassNames<typeof ClassPureComponent>
      & ClassNames<typeof Functional>
      & ClassNames<Props>
    )["classnames"];
  
    const suites: Record<string, AppClassNames> = {
      "exact": {
        App: undefined,
        component: undefined,
        comp0: undefined,
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
    type AppClassNames = ClassNames<
        true,
        "App",
        typeof ClassComponent,
        typeof ClassPureComponent,
        typeof Functional,
        Props
    >["classnames"];

    const suites: Record<string, AppClassNames> = {
      "exact": {
        App: undefined,
        component: undefined,
        comp0: undefined,
        functional: undefined,
        props: undefined,
        pureComponent: undefined
      }
    }

    expect(suites).toBeInstanceOf(Object)
  })
})
