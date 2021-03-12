/// <reference path="global.d.ts" />

import { classNaming } from "./naming"

export type {
  ClassNames,
  ClassNamesProperty,
  ClassHash,
  ClassNamed,
  ClassNamesFrom,
  Undefineds
} from "./main.types"

export default classNaming
export { classNaming }
export { classNamesCheck } from "./check"
export { classNamesMap } from "./map"
export { classBeming } from "./bem"
export { setOptions } from "./bem.core"
