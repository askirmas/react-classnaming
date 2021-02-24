const stringifyProperty: SymbolConstructor["toPrimitive"] | "valueOf" | "toString"  = Symbol.toPrimitive

const {
  defineProperty: $defineProperty
} = Object

export {
 stringifyClassNamed, emptize
}

function stringifyClassNamed<T extends {className: string}>(source: T) :T {
  if (!source.hasOwnProperty(stringifyProperty))
    $defineProperty(source, stringifyProperty, {value: classNamedToString})
  
  return source
}

function classNamedToString(this: {className: string}) {
  return this.className
}

function emptize(source: undefined|Record<string, any>) {
  if (
    source
    && !source.hasOwnProperty(stringifyProperty)
  )
    $defineProperty(source, stringifyProperty, {value: emptyLambda})
  return source
}

function emptyLambda() {
  return "" as const
}
