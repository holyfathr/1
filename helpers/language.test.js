import {
  formatCount,
  formatCountNoun,
  formatDate,
  formatName,
  formatNameShort,
  formatNumber,
  formatPrice,
} from "./language"

describe("formatCount", () => {
  it("correctly formats when count is zero", () => {
    const formatted = formatCount(0, "заявка", "заявки", "заявок")
    expect(formatted).toEqual("0 заявок")
  })

  it("correctly formats when count is one", () => {
    const formatted = formatCount(1, "заявка", "заявки", "заявок")
    expect(formatted).toEqual("1 заявка")
  })

  it("correctly formats when count is two", () => {
    const formatted = formatCount(2, "заявка", "заявки", "заявок")
    expect(formatted).toEqual("2 заявки")
  })

  it("correctly formats when count is five", () => {
    const formatted = formatCount(5, "заявка", "заявки", "заявок")
    expect(formatted).toEqual("5 заявок")
  })

  it("correctly formats when count is big", () => {
    const formatted = formatCount(100500, "заявка", "заявки", "заявок")
    expect(formatted).toEqual("100500 заявок")
  })
})

describe("formatCountNoun", () => {
  it("correctly formats when count is zero", () => {
    const formatted = formatCountNoun(0, "заявка", "заявки", "заявок")
    expect(formatted).toEqual("заявок")
  })

  it("correctly formats when count is one", () => {
    const formatted = formatCountNoun(1, "заявка", "заявки", "заявок")
    expect(formatted).toEqual("заявка")
  })

  it("correctly formats when count is two", () => {
    const formatted = formatCountNoun(2, "заявка", "заявки", "заявок")
    expect(formatted).toEqual("заявки")
  })

  it("correctly formats when count is five", () => {
    const formatted = formatCountNoun(5, "заявка", "заявки", "заявок")
    expect(formatted).toEqual("заявок")
  })

  it("correctly formats when count is big", () => {
    const formatted = formatCountNoun(100500, "заявка", "заявки", "заявок")
    expect(formatted).toEqual("заявок")
  })
})

describe("formatNumber", () => {
  it("correctly formats small number", () => {
    const formatted = formatNumber(1)
    expect(formatted).toEqual("1")
  })

  it("correctly formats thousands", () => {
    const formatted = formatNumber(1000)
    expect(formatted).toEqual("1 000")
  })

  it("correctly formats millions", () => {
    const formatted = formatNumber(1_000_000)
    expect(formatted).toEqual("1 000 000")
  })

  it("correcly formats big numbers", () => {
    const formatted = formatNumber(312_345_675)
    expect(formatted).toEqual("312 345 675")
  })

  it("correcly formats negative numbers", () => {
    const formatted = formatNumber(-312_345_675)
    expect(formatted).toEqual("-312 345 675")
  })
})

describe("formatDate", () => {
  it("returns undefined for invalid date", () => {
    const formatted = formatDate("2022-15-15")
    expect(formatted).toBeUndefined()
  })

  it("correctly formats with default format", () => {
    const formatted = formatDate("2022-02-15")
    expect(formatted).toEqual("15 февраля 2022")
  })

  it("correctly formats with custom format", () => {
    const formatted = formatDate("2022-02-15", "d MMMM yyyy HH:mm")
    expect(formatted).toEqual("15 февраля 2022 00:00")
  })
})

describe("formatPrice", () => {
  it("returns undefined for invalid price", () => {
    const formatted = formatPrice("abc")
    expect(formatted).toBeUndefined()
  })

  it("correctly formats small numbers", () => {
    const formatted = formatPrice(100)
    expect(formatted).toEqual("100 ₽")
  })

  it("correctly formats big numbers", () => {
    const formatted = formatPrice(100500)
    expect(formatted).toEqual("100 500 ₽")
  })
})

describe("formatNameShort", () => {
  it("returns undefined if no name provided", () => {
    const nothing = formatNameShort(undefined, undefined, undefined)
    expect(nothing).toBeUndefined()

    const surname = formatNameShort(undefined, "Петров", undefined)
    expect(surname).toBeUndefined()

    const middleName = formatNameShort(undefined, undefined, "Алексеевич")
    expect(middleName).toBeUndefined()
  })

  it("correctly formats name", () => {
    const formatted = formatNameShort("Иван", undefined, undefined)
    expect(formatted).toEqual("Иван")
  })

  it("correctly formats name and surname", () => {
    const formatted = formatNameShort("Иван", "Петров", undefined)
    expect(formatted).toEqual("Петров И.")
  })

  it("correctly formats name, surname and middle name", () => {
    const formatted = formatNameShort("Иван", "Петров", "Алексеевич")
    expect(formatted).toEqual("Петров И. А.")
  })
})

describe("formatName", () => {
  it("returns undefined if nothing is provided", () => {
    const formatted = formatName(undefined, undefined, undefined)
    expect(formatted).toBeUndefined()
  })

  it("correctly formats name", () => {
    const formatted = formatName("Иван", undefined, undefined)
    expect(formatted).toEqual("Иван")
  })

  it("correctly formats surname", () => {
    const formatted = formatName(undefined, "Петров", undefined)
    expect(formatted).toEqual("Петров")
  })

  it("correctly formats middle name", () => {
    const formatted = formatName(undefined, undefined, "Алексеевич")
    expect(formatted).toEqual("Алексеевич")
  })

  it("correctly formats name and surname", () => {
    const formatted = formatName("Иван", "Петров", undefined)
    expect(formatted).toEqual("Петров Иван")
  })

  it("correctly formats full name", () => {
    const formatted = formatName("Иван", "Петров", "Алексеевич")
    expect(formatted).toEqual("Петров Иван Алексеевич")
  })
})
