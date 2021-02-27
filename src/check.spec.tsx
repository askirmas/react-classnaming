import React from "react"
import type { ClassNames, ClassNamesProperty, ClassHash } from "./ctx"
import { classNamesCheck } from "./check"

import css from "./some.css"
import module from "./some.module.css"
const module_css: typeof module = {
  "class1": "hash1",
  "class2": "hash2"
}

function App(_: ClassNames<ClassNamesProperty<{class1: ClassHash; class2: ClassHash}>>) { return null }
function Component(_: ClassNames<ClassNamesProperty<{class1: ClassHash}>>) { return null }

it("without", () => {
  //@ts-expect-error
  <App classnames={css} />;
  <App classnames={module_css} />;
  <Component classnames={module_css} />;
})

it("declares", () => {
  <App classnames={classNamesCheck()} />;

  <App
      //@ts-expect-error Property 'class2' is missing
      classnames={
        classNamesCheck<ClassNamesProperty<{Class1: ClassHash}>>() } />;

    <App
      //@ts-expect-error Property 'class2' is missing
      classnames={
        classNamesCheck<typeof Component>()} />;
  
  expect(true).toBe(true)
})

it("propagates", () => {
  //@ts-expect-error
  <App classnames={classNamesCheck(css)} />;

  <Component classnames={classNamesCheck(module_css)} />;

  <App classnames={classNamesCheck(module_css)} />;

  <App
    //@ts-expect-error Property 'class2' is missing
    classnames={
      classNamesCheck({class1: undefined})} />;
})

it("equility if possible", () => {
  <App classnames={classNamesCheck<typeof App>(css)} />;

  <App classnames={classNamesCheck<typeof App>(module_css)} />;

  <App
    //@ts-expect-error is not assignable
    classnames={
      classNamesCheck<typeof Component>(css)} />;

  <App
    //@ts-expect-error is not assignable
    classnames={
      classNamesCheck<typeof Component>(module_css)} />;
    
  classNamesCheck<typeof Component>({class1: "undefined",
    //TODO @ts-expect-error Object literal may only specify known properties, but 'class2' does not exist
    class2: "undefined"});
  //TODO //@ts-expect-error
  classNamesCheck<typeof Component, typeof module_css>(module_css);

  //@ts-expect-error
  <App classnames={classNamesCheck<typeof App, typeof css>(css)} />;

  <Component classnames={classNamesCheck<typeof App, typeof module_css>(module_css)} /> ;

  //@ts-expect-error Property 'class1' is missing in type '"class2"[]'
  <Component classnames={classNamesCheck<typeof Component, typeof module_css>(module_css)} /> ;
  //@ts-expect-error Property 'class1' is missing in type '"class2"[]'
  <Component classnames={classNamesCheck<typeof Component, typeof module_css>()} /> ;

  expect(true).toBe(true)
})