import { forwardRef } from "react"
import clsx from "clsx"

import { getTrainingFormTitle } from "helpers/enums"

import styles from "./training-form-picker.module.scss"

const TrainingFormPicker = (
  { forms, value, onChange, className, readOnly, ...props },
  ref
) => {
  const preChange = ({ target }) => onChange && onChange(target.value)

  className = clsx(styles.picker, readOnly && styles.readOnly, className)

  return (
    <div className={className} {...props} ref={ref}>
      {["B", "P", "A"].map((form) => (
        <Option value={form} key={form} checked={value === form} onChange={preChange}>
          {getTrainingFormTitle(form)}
        </Option>
      ))}
    </div>
  )
}

const Option = forwardRef(({ children, ...props }, ref) => (
  <label>
    <input className={styles.input} type="radio" {...props} ref={ref} />
    <span className={styles.label}>{children}</span>
  </label>
))

Option.displayName = "Option"

export default forwardRef(TrainingFormPicker)
