import { ClassHash, ClassNamesProperty, CssModule } from "./defs";
import {resolver} from "./core"

const {keys: $keys} = Object

export default classNamesMap

function classNamesMap<
  Target extends ClassNamesProperty<CssModule>,
  Source extends ClassNamesProperty<CssModule>,
>(map: {
  [T in keyof Target["classnames"]]:
    {[S in keyof Source["classnames"]]?: ClassHash}
  }
): {classnames: {[T in keyof Target["classnames"]]: string}} {
  const keys = $keys(map) as (keyof Target["classnames"])[]
  , classnames = {} as {[T in keyof Target["classnames"]]: string}

  for (let i = keys.length; i--;) {
    const key = keys[i]
    
    classnames[key] = resolver(undefined, map[key]).join(" ")
  }

  return {classnames}
}