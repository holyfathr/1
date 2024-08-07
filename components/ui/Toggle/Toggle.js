import clsx from "clsx"
import { forwardRef } from "react"

import styles from "./toggle.module.scss"

const Toggle = ({ children, disabled, className, ...props }, ref) => {
  className = clsx(styles.toggle, disabled && styles.disabled, className)

  return (
    <label className={className}>
      <input
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        {...props}
        ref={ref}
      />
      <span>{children}</span>
    </label>
  )
}

export default forwardRef(Toggle)
