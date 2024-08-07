import { useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"

import { formatCount } from "helpers/language"

/**
 * Provides handy way of dynamically counting
 * the remaining characters of limited width
 * inputs.
 *
 * @param {string} name - Name of the input
 * @param {number} maxLength - Maximum length of the input
 *
 * @returns {object} Props and remaining characters
 */
const useLimitedInput = (name, maxLength) => {
  const { register, control, getValues } = useFormContext()
  const value = useWatch({ control, name, defaultValue: getValues(name) || "" })

  const props = useMemo(() => {
    return { ...register(name, { maxLength }), maxLength }
  }, [maxLength, name, register])

  const left = maxLength - value.length

  const leftFormatted = useMemo(() => {
    const formatted = formatCount(left, "символ", "символа", "символов")
    return value.length ? "ост. " + formatted : formatted
  }, [left])

  return { props, left, leftFormatted }
}

export default useLimitedInput
