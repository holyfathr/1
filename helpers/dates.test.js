import { parseObjectDates } from "./dates"

describe("parseObjectDates", () => {
  it("handles empty object", () => {
    const source = {}
    const result = parseObjectDates(source)

    expect(result).toEqual({})
  })

  it("returns same object if no dates found", () => {
    const source = { a: "hello", b: 5, c: { d: new Date() } }
    const result = parseObjectDates(source)

    expect(result).toBe(source)
  })

  it("handles invalid ISO dates", () => {
    const source = { a: "2022-13-10", b: "2022-12-10T00:00:00" }
    const result = parseObjectDates(source)

    expect(result).toBe(source)
  })

  it("converts ISO dates", () => {
    const source = { a: "2022-12-10" }
    const result = parseObjectDates(source)

    expect(result).toEqual({ a: new Date(2022, 11, 10) })
  })

  it("works for first-level properties only", () => {
    const source = { a: "2022-12-10", b: { c: "2022-12-10" } }
    const result = parseObjectDates(source)

    expect(result).toEqual({ a: new Date(2022, 11, 10), b: { c: "2022-12-10" } })
  })
})
