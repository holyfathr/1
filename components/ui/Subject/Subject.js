import clsx from "clsx"
import { forwardRef } from "react"

import styles from "./subject.module.scss"

const Subject = ({ children, className, ...props }, ref) => {
  className = clsx(styles.subject, className)

  return (
    <label className={className}>
      <input type="checkbox" className={styles.input} {...props} ref={ref} />
      <span className={styles.content}>{children}</span>
    </label>
  )
}

export default forwardRef(Subject)
