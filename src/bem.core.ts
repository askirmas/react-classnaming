import type { BemAbsraction } from "./bem.types"

let elementDelimiter = "__"
, modDelimiter = "--"
, blockModKey = "$"

export type BemOptions = {
  elementDelimiter: string
  modDelimiter: string
  blockModKey: string
}

export {
  bem2arr,
  setOptions,
  getOptions
}

function bem2arr(query: BemAbsraction) {
  const $return: string[] = []

  for (const block in query) {
    const blockQ = query[block]
    
    if (!blockQ) 
      continue
    if (typeof blockQ !== "object") {
      $return.push(block)
      if (typeof blockQ === "string")
        $return.push(`${block}${modDelimiter}${blockQ}`)
      continue
    }

    for (const el in blockQ) {
      const elementQ = blockQ[el]
      , isBlockMod = el === blockModKey
      , element = isBlockMod ? block : `${block}${elementDelimiter}${el}`
      
      if (!elementQ) {
        isBlockMod && $return.push(element)
        continue
      }
      
      $return.push(element)

      if (typeof elementQ !== "object") {
        if (typeof elementQ === "string")
          $return.push(`${element}${modDelimiter}${elementQ}`)
        continue
      }

      for (const mod in elementQ) {
        const modValue = elementQ[mod]
        if (!modValue)
          continue

        $return.push(`${element}${modDelimiter}${mod}${
          typeof modValue !== "string"
          ? ""
          : `${modDelimiter}${modValue}`
        }`)
      }
    }
  }
  
  return $return
}

function setOptions({
  elementDelimiter: elD = elementDelimiter,
  modDelimiter: modDel = modDelimiter,
  blockModKey: modKey = blockModKey
}: Partial<BemOptions>) {
  elementDelimiter = elD
  modDelimiter = modDel
  blockModKey = modKey
}

function getOptions() {
  return {
    elementDelimiter,
    modDelimiter,
    blockModKey
  }
}