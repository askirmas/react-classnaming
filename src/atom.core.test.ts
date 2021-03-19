import { atom2arr } from "./atom.core";

it("demo", () => expect(atom2arr({
  collapse: true,
  display: 1,
  "progress-bar": "animated",
  "justify-content": {
    _: "around",
    lg: "between"
  },
  d: ["inline", {lg: "inline-block"}]
})).toStrictEqual([
  "collapse",
  "display-1",
  "progress-bar-animated",
  "justify-content-around",
  "justify-content-lg-between",
  "d-inline",
  "d-lg-inline-block"
]))

it("falsing", () => expect(atom2arr({
  //@ts-expect-error
  "null": null,
  "false": false,
  "0": 0,
  //@ts-expect-error
  "undefined": undefined,
  "empty": ""
})).toStrictEqual([
  "0-0",
  "undefined-undefined",
  "empty-"
]))