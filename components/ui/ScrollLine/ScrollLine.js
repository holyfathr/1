import clsx from "clsx"

import styles from "./scroll-line.module.scss"

const ScrollLine = ({ children, className, wrapperClassName, ...props }) => {
  className = clsx(styles.line, className)
  wrapperClassName = clsx(styles.wrapper, wrapperClassName)

  return (
    <div className={wrapperClassName} {...props}>
      <div className={className}>{children}</div>
    </div>
  )
}

export default ScrollLine
