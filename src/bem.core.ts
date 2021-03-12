import type { BemInGeneral } from "./bem.types"

let modDelimiter = "--"
// TODO #30 , elementDelimiter = "__"

export type BemOptions = {
  // TODO #30 elementDelimiter: string
  modDelimiter: string
}

export {
  bem2arr,
  setOptions,
  getOptions
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

    for (const mod in baseQ) {
      const modValue = baseQ[mod]
      if (!modValue)
        continue

      $return.push(`${base}${modDelimiter}${mod}${
        typeof modValue !== "string"
        ? ""
        : `${modDelimiter}${modValue}`
      }`)
    }
  }
  
  return $return
}

function setOptions({
  // TODO #30 elementDelimiter: elD = elementDelimiter,
  modDelimiter: modDel = modDelimiter
}: Partial<BemOptions>) {
  modDelimiter = modDel
}

function getOptions() {
  return {
    // TODO #30 elementDelimiter,
    modDelimiter,
  }
}