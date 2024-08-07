import { forwardRef } from "react"
import clsx from "clsx"

import styles from "./textarea.module.scss"

const TextArea = ({ children, className, ...props }, ref) => {
  className = clsx(styles.textarea, className)

  return (
    <textarea className={className} {...props} ref={ref}>
      {children}
    </textarea>
  )
}

export default forwardRef(TextArea)
