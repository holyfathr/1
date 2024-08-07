import clsx from "clsx"
import { forwardRef } from "react"

import Icon from "components/ui/Icon"
import Button from "components/ui/Button"

import styles from "./action-button.module.scss"

const ActionButton = (
  { icon, variant = "accent", className, children, ...props },
  ref
) => {
  className = clsx(styles.button, styles[variant], className)

  return (
    <Button className={className} {...props} ref={ref}>
      <span className={styles.content}>{children}</span>
      <span className={styles.iconWrapper}>
        <Icon slug={icon} className={styles.icon} />
      </span>
    </Button>
  )
}

export default forwardRef(ActionButton)
