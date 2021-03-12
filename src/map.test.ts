import { classNamesMap } from "./map";
import classNaming, { ClassHash } from '.';

const module_css = {
  class1: "hash1",
  class2: "hash2"
}

type ThirdPartyComponentProps = {
  notString?: boolean
  required: string
  optional?: string
  stringAndOthers?: string | Object
  [x: string]: any
}

const mapping = classNamesMap(module_css)

describe("#27 classNaming as values", () => {
  it("same source", () => {
    const classes = classNaming({classnames: module_css})

    expect(mapping({} as ThirdPartyComponentProps, {
      required: classes({class1: true})
    })).toStrictEqual({
      required: "hash1"
    })
  })

  it("another source", () => {
    const classes = classNaming<{classnames: {CLASS: ClassHash}}>()

    expect(mapping({} as ThirdPartyComponentProps, {
      //TODO No type check for sources inconsistency
      required: classes({CLASS: true})
    })).toStrictEqual({
      required: "CLASS"
    })
  })
})

describe("type checks", () => {
  it("All target keys are optional", () => {
    const mapped = mapping({} as ThirdPartyComponentProps, {})
    expect(mapped).toStrictEqual({})
  })

  it("No unknown source keys", () => {
    const mapped = mapping({} as ThirdPartyComponentProps, {
      required: {
        //@ts-expect-error Object literal may only specify known properties, but 'class3' does not exist
        class3: true
      }
    })
    expect(mapped).toStrictEqual({required: "class3"})
  })

  it("No unknown target keys", () => {
    const mapped = mapping({} as ThirdPartyComponentProps, {
      //@ts-expect-error Object literal may only specify known properties, and '"unknown"' does not exist
      unknown: {
        class1: true
      }
    })

    expect(mapped).toStrictEqual({unknown: "hash1"})
  })

  it("No target keys without string value type", () => {
    const mapped = mapping({} as ThirdPartyComponentProps, {
      //@ts-expect-error Object literal may only specify known properties, and 'notString' does not exist
      notString: {
        class1: true
      }
    })

    expect(mapped).toStrictEqual({notString: "hash1"})
  })

  it("All keys string value type", () => {
    const mapped = mapping({} as ThirdPartyComponentProps, {
      required: {class1: true},
      optional: {class2: true},
      stringAndOthers: {class1: true, class2: true}
    })

    expect(mapped).toStrictEqual({
      required: "hash1",
      optional: "hash2",
      stringAndOthers: "hash1 hash2"
    })
  })

  describe("Strict action", () => {
    it("boolean|undefined", () => {
      const {act} = {} as {act?: boolean}
      , mapped = mapping({} as ThirdPartyComponentProps, {
        //@ts-expect-error Type 'boolean | undefined' is not assignable to type 'boolean'
        required: {class2: act},
      })

      expect(mapped).toStrictEqual({required: "hash2"})
    })

    it('""|undefined', () => {
      const {act} = {} as {act?: ""}
      , mapped = mapping({} as ThirdPartyComponentProps, {
        //@ts-expect-error Type 'string | undefined' is not assignable to type 'never'.
        required: {class2: act},
      })

      expect(mapped).toStrictEqual({required: "hash2"})
    })

    it("hash", () => {
      const {act} = {} as {act?: string}
      , mapped = mapping({} as ThirdPartyComponentProps, {
        required: {class2: act},
      })

      expect(mapped).toStrictEqual({required: "hash2"})
    })
  })

  it("return keys", () => {
    const mapped = mapping({} as ThirdPartyComponentProps, {
      required: {class2: true}
    })
    , check: Record<string, typeof mapped> = {
      //@ts-expect-error #25 Property 'required' is missing
      "empty": {},
      "exact": {
        required: "string"
      },
      "redundant": {
        required: "string",
        //@ts-expect-error #25 Object literal may only specify known properties, and 'optional' does not exist
        optional: "string",
      }
    }
    expect(check).toBeInstanceOf(Object)
  })

  it("undefined is also map", () => {
    const reqClasses = undefined as undefined | {}
    , mapped = mapping({} as ThirdPartyComponentProps, {
      required: reqClasses,
      optional: undefined,
    })
    , check: Record<string, typeof mapped> = {
      //@ts-expect-error Property 'required' is missing
      "empty": {},
      "exact": {
        required: "string"
      },
      "redundant": {
        required: "string",
        //@ts-expect-error Object literal may only specify known properties, and 'optional' does not exist
        optional: "string",
      }
    }

    expect(mapped).toStrictEqual({})
    expect(check).toBeInstanceOf(Object)
  })
})
