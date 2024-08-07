import clsx from "clsx"
import { forwardRef, useId } from "react"

import styles from "./education-level-picker.module.scss"
import Checkbox from "components/ui/Checkbox"

const EducationLevelPicker = ({ children, className, ...props }) => {
  className = clsx(styles.picker, className)

  return (
    <div className={styles.wrapper}>
      <div className={className} {...props}>
        {children}
      </div>
    </div>
  )
}

const Option = ({ title, ...props }, ref) => {

  return (
    <label className={styles.label}>
      <Checkbox {...props} ref={ref}>
        {title}
      </Checkbox>
    </label>
  )
}

EducationLevelPicker.Option = forwardRef(Option)

export default EducationLevelPicker
