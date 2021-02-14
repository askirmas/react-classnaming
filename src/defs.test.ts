import { Component } from "react";
import { ClassNames, ClassNamesFrom } from "./defs";

it("ClassNamesFrom", () => {
  class ClassComponent extends Component<ClassNames<"component">> {}
  class ClassPureComponent extends Component<ClassNames<"pureComponent">> {}
  function Functional(_: ClassNames<"functional">) {
    return null
  }
  type ComponentProps= ClassNames<"props">

  type AppProps = (ClassNames<"App">
  & ClassNamesFrom<typeof ClassComponent>
  & ClassNamesFrom<typeof ClassPureComponent>
  & ClassNamesFrom<typeof Functional>
  & ClassNamesFrom<ComponentProps>)["classNames"]

  const suites: Record<string, AppProps> = {
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


