import { renameKeys } from "./objects"

describe("renameKeys", () => {
  it("accepts empty rename map", () => {
    const source = { a: "Hello", b: -10 }
    const result = renameKeys(source, {})

    expect(result).toEqual(source)
  })

  it("accepts empty source object", () => {
    const source = {}
    const result = renameKeys(source, { a: "newA" })

    expect(result).toEqual(source)
  })

  it("correctly renames keys", () => {
    const source = { a: "Hello", b: -10, c: [1, 2, 3] }
    const result = renameKeys(source, { a: "newA", b: "newB" })

    expect(result).toEqual({ newA: "Hello", newB: -10, c: [1, 2, 3] })
  })
})
