import clsx from "clsx"

import styles from "./full-width.module.scss"

const FullWidth = ({ className, children, ...props }) => {
  className = clsx(styles.container, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default FullWidth
