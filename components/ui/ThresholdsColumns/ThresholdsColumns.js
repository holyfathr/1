import clsx from "clsx"

import styles from "./thresholds-columns.module.scss"

const ThresholdsColumns = ({ children, className, ...props }) => {
  className = clsx(styles.columns, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

const Column = ({ priority, children, className, ...props }) => {
  className = clsx(styles.column, className)

  return (
    <div className={className} {...props}>
      <strong className={styles.priority}>{priority}</strong>
      {children}
      <p className={styles.subtitle}>Минимальный балл</p>
    </div>
  )
}

ThresholdsColumns.Column = Column

export default ThresholdsColumns
