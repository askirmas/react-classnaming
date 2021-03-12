import type { BemInGeneral } from "./bem.types"

const {isArray: $isArray} = Array

let modDelimiter = "--"
, elementDelimiter = "__"

export type BemOptions = {
  elementDelimiter: string
  modDelimiter: string
}

export {
  bem2arr,
  setOptions
}

function bem2arr(query: BemInGeneral) {
  const $return: string[] = []

  for (const base in query) {
    const baseQ = query[base]
    $return.push(base)
    
    if (!baseQ) 
      continue
    if (typeof baseQ !== "object") {
      if (typeof baseQ === "string")
        $return.push(`${base}${modDelimiter}${baseQ}`)
      continue
    }

    const isArray = $isArray(baseQ)

    // TODO check performance of `const in Array`
    for (const mod in baseQ) {
      //@ts-expect-error //TODO Split Array and Object?
      const modValue = baseQ[mod]
      if (!modValue)
        continue

      $return.push(`${base}${
        isArray
        ? ""
        : `${modDelimiter}${mod}`
      }${
        typeof modValue !== "string"
        ? ""
        : `${modDelimiter}${modValue}`
      }`)
    }
  }
  
  return $return
}

function setOptions({
  elementDelimiter: elD = elementDelimiter,
  modDelimiter: modDel = modDelimiter
}: Partial<BemOptions>) {
  modDelimiter = modDel
  elementDelimiter = elD
}
