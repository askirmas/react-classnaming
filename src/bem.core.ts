let elementDelimiter = "__"
, modDelimiter = "--"
, blockModKey = "$"

export type BemOptions = {
  elementDelimiter: string
  modDelimiter: string
  blockModKey: string
}

export type BemAbsraction = {
  [block: string]: undefined | boolean | string | {
    [el: string]: undefined | boolean | string | {
      [mod: string]: undefined | boolean | string
    }
  }
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
      continue
    }

    for (const el in blockQ) {
      const elementQ = blockQ[el]
      , element = el === blockModKey ? block : `${block}${elementDelimiter}${el}`
      
      if (!elementQ) {
        el === blockModKey && $return.push(element)
        continue
      }
      
      $return.push(element)

      if (typeof elementQ !== "object")
        continue

      for (const mod in elementQ) {
        const modValue: undefined|boolean|string = elementQ[mod]
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