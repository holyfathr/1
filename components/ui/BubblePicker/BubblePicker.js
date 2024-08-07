import clsx from "clsx"
import { forwardRef } from "react"

import styles from "./bubble-picker.module.scss"

const BubblePicker = ({ children, className, ...props }) => {
  className = clsx(styles.picker, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

const Bubble = ({ children, className, ...props }, ref) => {
  className = clsx(styles.bubble, className)

  return (
    <label className={className}>
      <input type="checkbox" className={styles.input} {...props} ref={ref} />
      <div className={styles.bubbleContent}>{children}</div>
    </label>
  )
}

BubblePicker.Bubble = forwardRef(Bubble)

export default BubblePicker
