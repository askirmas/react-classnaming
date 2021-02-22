import React from "react"
import classNamesCheck from "./check"
import type { ClassNames } from "./defs"

import css from "./some.css"
import module from "./some.module.css"
const module_css: typeof module = {
  "class1": "hash1",
  "class2": "hash2"
}

function App(_: ClassNames<"class1"|"class2">) { return null }
function Component(_: ClassNames<"class1">) { return null }

it("without", () => {
  <App classNames={css} />;
  <App classNames={module_css} />;
  <Component classNames={module_css} />;
})

it("declares", () => {
  <App classNames={classNamesCheck()} />;

  <App
      //@ts-expect-error Property 'class2' is missing
      classNames={
        classNamesCheck<"class1">() } />;

    <App
      //@ts-expect-error Property 'class2' is missing
      classNames={
        classNamesCheck<typeof Component>()} />;
  
  expect(true).toBe(true)
})

it("propagates", () => {
  <App classNames={classNamesCheck(css)} />;

  <Component classNames={classNamesCheck(module_css)} />;

  <App classNames={classNamesCheck(module_css)} />;

  <App
    //@ts-expect-error Property 'class2' is missing
    classNames={
      classNamesCheck({class1: undefined})} />;
})

it("equility if possible", () => {
  <App classNames={classNamesCheck<typeof App>(css)} />;

  <App classNames={classNamesCheck<typeof App>(module_css)} />;

  <App
    //@ts-expect-error is not assignable
    classNames={
      classNamesCheck<typeof Component>(css)} />;

  <App
    //@ts-expect-error is not assignable
    classNames={
      classNamesCheck<typeof Component>(module_css)} />;
    
  classNamesCheck<typeof Component>({class1: "undefined",
    //@ts-expect-error Object literal may only specify known properties, but 'class2' does not exist
    class2: "undefined"});
  //TODO //@ts-expect-error
  classNamesCheck<typeof Component, typeof module_css>(module_css);

  <App classNames={classNamesCheck<typeof App, typeof css>(css)} />;

  <Component classNames={classNamesCheck<typeof App, typeof module_css>(module_css)} /> ;

  //@ts-expect-error Property 'class1' is missing in type '"class2"[]'
  <Component classNames={classNamesCheck<typeof Component, typeof module_css>(module_css)} /> ;
  //@ts-expect-error Property 'class1' is missing in type '"class2"[]'
  <Component classNames={classNamesCheck<typeof Component, typeof module_css>()} /> ;

  expect(true).toBe(true)
})