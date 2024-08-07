import clsx from "clsx"
import { forwardRef } from "react"

import styles from "./wrapper.module.scss"

const Wrapper = ({ as: Component = "div", children, className, ...props }, ref) => {
  className = clsx(styles.wrapper, className)

  return (
    <Component className={className} {...props} ref={ref}>
      {children}
    </Component>
  )
}

export default forwardRef(Wrapper)
