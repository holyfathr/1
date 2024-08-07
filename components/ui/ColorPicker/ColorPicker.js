import clsx from "clsx"
import { forwardRef } from "react"

import Icon from "components/ui/Icon"

import styles from "./color-picker.module.scss"

const ColorPicker = ({ className, children, ...props }) => {
  className = clsx(styles.colors, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

const Option = ({ value, className, ...props }, ref) => {
  className = clsx(styles.option, className)

  return (
    <div className={className} style={{ backgroundColor: value }}>
      <input className={styles.radio} type="radio" value={value} {...props} ref={ref} />
      <Icon className={styles.icon} slug="checkmark-rounded" />
    </div>
  )
}

ColorPicker.Option = forwardRef(Option)

export default ColorPicker
