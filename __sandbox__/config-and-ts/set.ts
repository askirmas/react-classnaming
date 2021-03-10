/// <reference path="./set-config.d.ts" />

import { setOpts, getOpts} from "./config";

setOpts(
  "_" as const,
  "-" as const,
  "&" as const
)

const x = getOpts().blockModKey
, check: typeof x extends "&" ? true : false = true

export {x, check}
