import transform from "lodash/transform"

export const renameKeys = (obj, renameMap) => {
  return transform(
    obj,
    (result, value, key) => {
      const newKey = renameMap[key] || key
      result[newKey] = value
    },
    {}
  )
}
