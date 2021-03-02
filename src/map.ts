import {
  Action,
  ClassNamesProperty,
  CssModule
} from "./defs";
import {resolver} from "./core"

const {keys: $keys} = Object

export default classNamesMap

function classNamesMap<
  Source extends CssModule,
>(classnames: Source){
  const mapper: ClassNamesMap<Source> = map => mapping(classnames, map)
  return mapper
}

type ClassNamesMap<Source extends CssModule> = (
  <
    Target extends ClassNamesProperty<TargetClasses>,
    TargetClasses extends CssModule = CssModule
  >(map: {
    [T in keyof Target["classnames"]]:
      {[S in keyof Source]?: Action}
  }) => {classnames: {[T in keyof Target["classnames"]]: string}}
)

function mapping<
  Target extends ClassNamesProperty<CssModule>,
  Source extends CssModule,
>(source: Source, map: {
  [T in keyof Target["classnames"]]:
    {[S in keyof Source]?: Action}
  }
): {classnames: {[T in keyof Target["classnames"]]: string}} {
  const keys = $keys(map) as (keyof Target["classnames"])[]
  , classnames = {} as {[T in keyof Target["classnames"]]: string}

  for (let i = keys.length; i--;) {
    const key = keys[i]
    
    classnames[key] = resolver(source, map[key]).join(" ")
  }

  return {classnames}
}

