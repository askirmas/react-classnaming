import { Component, PureComponent, ReactElement } from "react";
import type { ClassNames, ClassNamesMap } from "./defs";

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

  it("nothing to pick", () => {
    type NoClassNames = ClassNames<true>
    const suites: Record<string, ClassNames<NoClassNames>> = {
      "nothing": {classnames: {}}
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

describe("ReactRelated2", () => {
  type ReactRelated2
  = {
    classnames: ClassNamesMap<string>
    [k: string]: any
  }
  | (
    (props: {
      classnames: ClassNamesMap<string>
      [k: string]: any  
    }) => ReactElement<any, any> | null)
  | (new (props: {classnames: ClassNamesMap<string>} & any) => Component<{
    classnames: ClassNamesMap<string>
    [k: string]: any
  }, any>);
  
  type Wrong = {classnames: string}
  type Props = {classnames: ClassNamesMap<string>, className: string}

  const suites: Record<string, ReactRelated2> = {
    //@ts-expect-error
    "Props without": {
      className: ""
    },
    "Props with wrong": {
      //@ts-expect-error
      classnames: ""
    },
    "Props with": {
      classnames: {},
      className: ""
    },
    //@ts-expect-error
    "Func without": (_: {className: string}) => null,
    //@ts-expect-error Types of parameters '_' and 'props' are incompatible.
    "Func with wrong": (_: Wrong) => null,
    //@ts-expect-error //TODO Fix it
    "Func with": (_: Props) => null,
    //@ts-expect-error
    "Class without": class extends Component {},
    //@ts-expect-error
    "Class with wrong": class extends Component<Wrong> {},
    "Class with": class extends Component<Props> {}
  }
  expect(suites).toBeInstanceOf(Object)
})