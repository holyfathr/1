import clsx from "clsx"

import styles from "./highlightv2.module.scss"

const HighlightV2 = ({ title, value, className, ...props }) => {
  className = clsx(styles.highlight, className)

  return (
    <div className={className} {...props}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
    </div>
  )
} 

export default HighlightV2
