import clsx from "clsx"
import { Children, cloneElement } from "react"

import styles from "./step-progress-bar.module.scss"

const StepProgressBar = ({ current, className, children, onChange, ...props }) => {
  className = clsx(styles.bar, className)

  return (
    <div className={className}>
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          index,
          active: index === current,
          passed: current > index,
          onChange,
        })
      )}
    </div>
  )
}

const Step = ({ index, active, passed, className, children, onChange, ...props }) => {
  const preChange = () => onChange && onChange(index)

  className = clsx(
    styles.step,
    active && styles.active,
    passed && styles.passed,
    className
  )

  return (
    <div className={className} {...props}>
      <button className={styles.button} onClick={preChange}>
        <span className={styles.number}>{index + 1}</span>
        <span className={styles.text}>
          <span className={styles.title}>{children}</span>
          <span className={styles.bold}>{children}</span>
        </span>
      </button>
    </div>
  )
}

StepProgressBar.Step = Step

export default StepProgressBar
