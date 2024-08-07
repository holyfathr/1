import clsx from "clsx"
import { forwardRef, useEffect, useRef, useState } from "react"
import { mergeRefs } from "react-merge-refs"

import IconButton from "components/ui/IconButton"

import styles from "./integer-input.module.scss"

const IntegerInput = (
  { min, max, title, hasError, onDelete, className, ...props },
  ref
) => {
  const internalRef = useRef()  
  const [filled, setFilled] = useState(false)

  const onInput = (event) => {
    setFilled(event.target.value.length > 0)
  }

  const onKeyDown = (event) => {
    const newValue = Number.parseInt(event.target.value + event.key)

    if (!Number.isNaN(newValue) && (newValue < min || newValue > max)) {
      event.preventDefault()
    }
  }

  useEffect(() => {
    setFilled(internalRef.current.value.length > 0)
  }, [])

  className = clsx(styles.wrapper, hasError && styles.error, className)

  return (
    <div className={className}>
      {onDelete && (
        <IconButton
          icon="trash"
          variant="danger"
          className={styles.button}
          onClick={onDelete}
        />
      )}
      <label>
        <span>{title}</span>
        <input
          className={clsx(styles.input, filled && styles.filled)}
          type="number"
          inputMode="numeric"
          onInput={onInput}
          onKeyDown={onKeyDown}
          min={min}
          max={max}
          {...props}
          ref={mergeRefs([internalRef, ref])}
        />
      </label>
    </div>
  )
}

export default forwardRef(IntegerInput)
