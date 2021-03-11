import React from "react"
import { classNamesCheck } from "../src/check"
import { EMPTY_OBJECT } from "../src/consts.json"
import type { ClassHash, ClassNamesFrom, ClassNamesProperty } from "../src/main.types"
import type { CssModule } from "../src/definitions.types"

export {}

const Component = ({classnames: {App}}: ClassNamesProperty<{App: ClassHash}>) => <div className={App}/>

const css_module_exact = {
  App: undefined
} //as {App: string|undefined}
, css_module = {
  App: undefined,
  "never-used": "bad"
}
, css_dictionary: CssModule = {}

it(classNamesCheck.name, () => {
  <Component classnames={classNamesCheck()} />;
  //@ts-expect-error Property 'App' is missing
  <Component classnames={classNamesCheck({})} />;

  <Component classnames={classNamesCheck(css_dictionary)} />;

  <Component classnames={classNamesCheck(css_dictionary, {} as ClassNamesFrom<typeof Component>)} />;

  <Component classnames={classNamesCheck(css_module_exact)} />;
  <Component classnames={classNamesCheck(css_module)} />;
  <Component classnames={classNamesCheck(css_module_exact, {} as ClassNamesFrom<typeof Component>)} />;
  <Component classnames={classNamesCheck<ClassNamesFrom<typeof Component>, typeof css_module_exact>(css_module_exact)} />;
  <Component classnames={classNamesCheck(
    css_module,
    //@ts-expect-error Property 'never-used' is missing
    {} as ClassNamesFrom<typeof Component>)
  } />;

  <Component classnames={classNamesCheck<
    //@ts-expect-error Type 'ClassNamesFrom<typeof Component>' does not satisfy the constraint
    ClassNamesFrom<typeof Component>,
    typeof css_module
  >(css_module)} />;

  expect(true).toBe(true)
})

it("research", () => {
  //@ts-expect-error Property 'App' is missing
  <Component classnames={{} as Record<string, ClassHash>} />;
  <Component classnames={{} as never} />;
  <Component classnames={{} as any} />;
  //@ts-expect-error Type 'unknown' is not assignable
  <Component classnames={{} as unknown} />;
  <Component classnames={{App: undefined,
    //@ts-expect-error Object literal may only specify known properties, and 'App__bad' does not exist
    App__bad: "bad"
  }} />;
  <Component classnames={css_module} />;
  <Component classnames={css_module as ClassNamesFrom<typeof Component>} />;
  expect(true).toBe(true)
})

it("research ", () => {
  function check0<
    //@ts-expect-error
    C extends T,
    T extends CssModule = CssModule>(source = EMPTY_OBJECT as T) {
    return source
  }

  // function check0<C extends T, T extends CssModule = CssModule>(source = EMPTY_OBJECT as T) :C {
  //   return source as C
  // }

  <Component classnames={check0()} />;
  //@ts-expect-error Property 'App' is missing 
  <Component classnames={check0({})} />;
  <Component classnames={check0(css_module_exact)} />;
  //#16 @ts-expect-error
  <Component classnames={check0(css_module)} />;

  //@ts-expect-error Property 'App' is missing in type 'CssModule'
  <Component classnames
    ={check0<ClassNamesFrom<typeof Component>>(css_module)} />;

  <Component classnames={check0<
    //@ts-expect-error Property 'never-used' is missing in type 'ClassNamesFrom<typeof Component>'
    ClassNamesFrom<typeof Component>,
    typeof css_module
  >(css_module)} />;

  function check2<T extends CssModule = CssModule, C extends {[K in keyof T]: ClassHash} = T>(
    source = EMPTY_OBJECT as T,
    _ = EMPTY_OBJECT as C
  ) {return source}

  <Component classnames={check2()} />;
  //@ts-expect-error Property 'App' is missing
  <Component classnames={check2({})} />;
  <Component classnames={check2(css_module_exact, {} as ClassNamesFrom<typeof Component>)} />;
  <Component classnames={check2<typeof css_module_exact, ClassNamesFrom<typeof Component>>(css_module_exact)} />;
  <Component classnames={check2(css_module,
    //@ts-expect-error Property 'never-used' is missing
    {} as ClassNamesFrom<typeof Component>)
  } />;
  <Component classnames={check2<
    typeof css_module,
    //@ts-expect-error Type 'ClassNamesFrom<typeof Component>' does not satisfy the constraint
    ClassNamesFrom<typeof Component>
  >(css_module)} />;

  expect(true).toBe(true)
})
