import React from "react"
import classNamesCheck from "./check"
import type { ClassNames, ClassNamesMap } from "./defs"

function Root(_: ClassNames<"fc1"|"fc2">) {
  return null
}

it("dummy", () => {
  <Root classNames={classNamesCheck()}/>;

  //@ts-expect-error Property 'fc2' is missing
  <Root classNames={classNamesCheck<"fc1">()}/>;
  <Root classNames={classNamesCheck<"fc1"|"fc2"|"etc">()}/>;

  expect(true).toBe(true)
})

it("check that all are used", () => {
  const classNames = {} as ClassNamesMap<"fc1"|"fc2"|"fc3">;
  //@ts-expect-error is missing the following properties
  <Root classNames={
    classNamesCheck<"">(classNames)
  } />;

  // TypeScript doesn't check redundant props
  <Root classNames={{} as ClassNamesMap<"fc1"|"fc2">} />;
  <Root classNames={classNames} />;
  <Root classNames={classNames as ClassNames<typeof Root>["classNames"]} />;
  
  //@ts-expect-error //TODO TBD redundant props
  <Root classNames={classNamesCheck<typeof Root>(classNames)} />;
  //@ts-expect-error //TODO TBD not error
  <Root3 classNames={classNamesCheck<typeof Root3>(classNames)} />;

  function Root3(_: ClassNames<"fc1"|"fc2"|"fc3">) {
    return null
  }

  expect(true).toBe(true)
})  
