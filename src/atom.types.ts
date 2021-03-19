export type AtomInGeneral = {
  [property: string]: boolean | number | string
  | {[record: string]: boolean | number | string}
  | [
    boolean | number | string,
    {[record: string]: boolean | number | string}
  ]
}
