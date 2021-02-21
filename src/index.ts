/** TBD 
 * 1. <div {...{false, undefined, null}}/> falls attributes
*/
export type { ClassNames } from "./defs"

import classNamingCtx from "./ctx"
import classNamesCheck from "./check"
import classNamingBasic from "./basic"

export {
  classNamesCheck,
  classNamingBasic,
  classNamingCtx
}
