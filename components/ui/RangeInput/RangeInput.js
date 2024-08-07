import { forwardRef } from "react"
import clsx from "clsx"

import PriceInput from "components/proxies/PriceInput"

import styles from "./range-input.module.scss"

const RangeInput = ({ className, children, ...props }) => {
  className = clsx(styles.wrapper, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

const Input = ({ className, ...props }, ref) => {
  className = clsx(styles.input, className)

  return (
    <span className={styles.inputWrapper}>
      <PriceInput className={className} {...props} ref={ref} />
    </span>
  )
}

RangeInput.Input = forwardRef(Input)

export default RangeInput
