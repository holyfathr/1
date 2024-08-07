import clsx from "clsx"
import { cloneElement, forwardRef } from "react"

import styles from "./label.module.scss"

const Label = ({ title, hasError, children, className, ...props }, ref) => {
  className = clsx(styles.label, hasError && styles.error, className)

  return (
    <label className={className} {...props} ref={ref}>
      <span className={styles.title}>{title}</span>
      {hasError ? cloneElement(children, { hasError }) : children}
    </label>
  )
}

export default forwardRef(Label)
