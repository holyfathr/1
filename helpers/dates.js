import parseISO from "date-fns/parseISO"

/**
 * Parses all ISO-like date strings (YYYY-MM-DD) in
 * object values and converts them to native
 * Dates.
 * ! Only first-level properties are converted.
 *
 * @param {object} obj - Object to parse dates of
 *
 * @returns {object} Same object with all strings replaced with Dates
 */
export const parseObjectDates = (obj) => {
  for (const [key, value] of Object.entries(obj))
    if (typeof value === "string" && /\d{4}-\d{2}-\d{2}/.test(value))
      obj[key] = parseISO(value)

  return obj
}
