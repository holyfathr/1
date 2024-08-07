import clsx from "clsx"
import { forwardRef } from "react"

import Icon from "components/ui/Icon"

import styles from "./checkbox.module.scss"

const Checkbox = (
  { children, disabled, variant = "default", className, readOnly, hasError, ...props },
  ref
) => {
  className = clsx(
    styles.checkbox,
    disabled && styles.disabled,
    readOnly && styles.readOnly,
    hasError && styles.error,
    styles[variant],
    className
  )

  return (
    <label className={className}>
      <input
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        {...props}
        readOnly={readOnly}
        ref={ref}
      />

      <span className={styles.mark}>
        <Icon slug="checkmark" className={styles.icon} />
      </span>

      <span>{children}</span>
    </label>
  )
}

export default forwardRef(Checkbox)
