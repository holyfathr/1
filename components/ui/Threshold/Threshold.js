import clsx from "clsx"

import styles from "./threshold.module.scss"

const Threshold = ({ value, children, className, valueClassName, ...props }) => {
  className = clsx(styles.threshold, className)
  valueClassName = clsx(styles.value, valueClassName)

  return (
    <span className={className} {...props}>
      <span>{children}</span>&nbsp;<span className={valueClassName}>{value}</span>
    </span>
  )
}

export default Threshold
