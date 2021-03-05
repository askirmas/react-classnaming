import {
  Component,
  PureComponent
} from "react"
import type {
  ClassHash,
  ClassNamesProperty,
  ClassNames
} from "../src/defs"

type Props = ClassNames<true, ClassNamesProperty<{props: ClassHash}>>
function Functional(_: ClassNames<ClassNamesProperty<{functional: ClassHash}>>) { return null }
class ClassComponent extends Component<ClassNames<ClassNamesProperty<{component: ClassHash; comp0: ClassHash}>>> {}
class ClassPureComponent extends PureComponent<ClassNames<ClassNamesProperty<{pureComponent: ClassHash}>>> {}

describe("ClassNames", () => {
  describe("direct", () => {
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
  
    it("<{class1, class2}>", () => {
      const suites: Record<string, ClassNames<{classnames: {class1: ClassHash; class2: ClassHash}}>> = {
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
  
    it("<true, {class1, class2}>", () => {
      const suites: Record<string, ClassNames<true, {classnames: {class1: ClassHash; class2: ClassHash}}>> = {
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
      const suite1: Record<string, ClassNames<
        //@ts-expect-error
        NoClassNames,
        {classnames: {class1: ClassHash}},
        {classnames: {class1: ClassHash}}
      >> = {
        "nothing": {classnames: {class1: ""}}
      }
      const suite2: Record<string, ClassNames<
        {classnames: {class1: ClassHash}},
        {classnames: {class1: ClassHash}},
        //@ts-expect-error
        NoClassNames
      >> = {
        "nothing": {classnames: {class1: ""}}
      }
      expect({suite1, suite2}).toBeInstanceOf(Object)
    })
  })

  describe("from", () => {
    it("manually merge", () => {
      type AppClassNames = (
        ClassNamesProperty<{App: ClassHash}>
        & ClassNames<typeof ClassComponent>
        & ClassNames<typeof ClassPureComponent>
        & ClassNames<typeof Functional>
        & ClassNames<Props>
      );
    
      const suites: Record<string, AppClassNames["classnames"]> = {
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
          ClassNamesProperty<{App: ClassHash}>,
          typeof ClassComponent,
          typeof ClassPureComponent,
          typeof Functional,
          Props
      >;
  
      const suites: Record<string, AppClassNames["classnames"]> = {
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
})

describe("ClassNamesProperty", () => {
  it("Free declaration", () => {
    type Props = ClassNamesProperty<{
      class1: ClassHash, class2: ClassHash
    }>
    const suites: Record<string, Props["classnames"]> = {
      "all setted": {
        class1: "class1",
        class2: undefined
      },
      "redundant": {
        class1: "class1",
        class2: undefined,
        //@ts-expect-error
        redundant: "redundant"
      },
      //@ts-expect-error
      "missed": {
        class1: "class1"
      },
      "wrong type": {
        class1: "class1",
        //@ts-expect-error
        class2: false
      }
    }
    expect(suites).toBeInstanceOf(Object)
  })
  
  it("Module based", () => {
    type CssModule = {
      App: ClassHash
      class1: ClassHash, class2: ClassHash
    }

    type Props = ClassNamesProperty<CssModule, {
      class1: ClassHash
      class2: ClassHash
      //TODO #12 Why no suggestion? Means - no rename effect
    }>

    type PropsWithWrong = ClassNamesProperty<CssModule,
      //@ts-expect-error
      {
        class1: ClassHash
        class3: ClassHash
      }
    >
    
    const suite4wrong: PropsWithWrong["classnames"] = {
        //@ts-expect-error Object literal may only specify known properties, but 'class3' does not exist
        class3: undefined,
    },
    suite: Props["classnames"] = {
      class1: "class1",
      class2: undefined
    }
    expect({suite4wrong, suite}).toBeInstanceOf(Object)
  })
})
