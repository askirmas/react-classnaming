const EMPTY_ARRAY = [] as const
, EMPTY_OBJECT = {} as const
, stackedKey = Symbol("stacked")
, defaultCtx = {
  classnames: EMPTY_OBJECT,
  // [classNameKey]: undefined,
  [stackedKey]: undefined
}

export {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  defaultCtx,
  stackedKey
}
