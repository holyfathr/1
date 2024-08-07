import { forwardRef } from "react"
import clsx from "clsx"

import styles from "./input.module.scss"

const Input = ({ hasError, className, ...props }, ref) => {
  className = clsx(styles.input, hasError && styles.error, className)

  return <input className={className} {...props} ref={ref} />
}

export default forwardRef(Input)
