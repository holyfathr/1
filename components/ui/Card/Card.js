import clsx from "clsx"
import { forwardRef } from "react"

import styles from "./card.module.scss"

const Card = ({ as: Component = "div", children, className, ...props }, ref) => {
  className = clsx(styles.card, className)

  return (
    <Component className={className} {...props} ref={ref}>
      {children}
    </Component>
  )
}

export default forwardRef(Card)
