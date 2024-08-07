import clsx from "clsx"

import styles from "./highlight.module.scss"

const Highlight = ({ title, children, className, ...props }) => {
  className = clsx(styles.highlight, className)

  return (
    <div className={className} {...props}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{children}</p>
    </div>
  )
}

export default Highlight
