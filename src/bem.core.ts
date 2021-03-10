let elementDelimiter = "__"
, modDelimiter = "--"
, blockModKey = "$"

export type BemOptions = {
  elementDelimiter: string
  modDelimiter: string
  blockModKey: string
}

export type BemAbsraction<blockModKey extends string> = {
  [block: string]: boolean | {
    [k in blockModKey]?: {
      [mod: string]: boolean | string
    }
  } & {
    [el: string]: undefined|boolean | {
      [mod: string]: boolean | string
    }
  }
}

export {
  bem2arr,
  setOptions,
  getOptions
}

function bem2arr(query: BemAbsraction<string>) {
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
        const modValue: string|boolean = elementQ[mod]
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