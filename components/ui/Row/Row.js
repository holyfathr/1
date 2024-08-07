import clsx from "clsx"

import styles from "./row.module.scss"

const Row = ({ className, children, ...props }) => {
  className = clsx(styles.row, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default Row
