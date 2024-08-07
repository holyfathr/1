import clsx from "clsx"

import styles from "./Column.module.scss"

const Column = ({ children, className, ...props }) => {
  className = clsx(styles.column, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default Column
