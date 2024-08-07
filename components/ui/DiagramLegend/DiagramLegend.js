import clsx from "clsx"

import styles from "./diagram-legend.module.scss"

const DiagramLegend = ({ children, className, ...props }) => {
  className = clsx(styles.legend, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

const Entry = ({ children, color, percentage }) => (
  <div className={styles.item}>
    <div className={styles.indicator} style={{ backgroundColor: color }}>
      {Math.round(percentage)}%
    </div>
    <p>{children}</p>
  </div>
)

DiagramLegend.Entry = Entry

export default DiagramLegend
