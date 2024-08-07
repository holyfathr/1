import { AddressSuggestions } from "react-dadata"
import { forwardRef, useEffect, useRef, useState } from "react"
import clsx from "clsx"

import Input from "components/ui/Input"

import styles from "./address-input.module.scss"

const AddressInput = (
  { className, onChange, onSuggestionChange, value: initialValue, ...props },
  inputRef
) => {
  const ref = useRef(null)
  const [value, setValue] = useState()

  const preChange = (suggestion) => {
    setValue(suggestion)

    onChange && onChange(suggestion.value)
    onSuggestionChange && onSuggestionChange(suggestion)
  }

  useEffect(() => {
    if (ref.current) ref.current.setInputValue(initialValue)
  }, [initialValue])

  className = clsx(styles.input, className)

  return (
    <AddressSuggestions
      token={process.env.NEXT_PUBLIC_DADATA_TOKEN}
      delay={250}
      count={5}
      minChars={3}
      customInput={Input}
      inputProps={{ className, ref: inputRef, ...props }}
      httpCache
      suggestionsClassName={styles.suggestions}
      containerClassName={styles.container}
      suggestionClassName={styles.suggestion}
      highlightClassName={styles.highlight}
      value={value}
      onChange={preChange}
      ref={ref}
    />
  )
}

export default forwardRef(AddressInput)
