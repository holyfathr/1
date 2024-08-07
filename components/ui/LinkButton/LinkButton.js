import clsx from "clsx"

import styles from "./link-button.module.scss"

const LinkButton = ({ variant = "default", className, children, ...props }) => {
  className = clsx(styles.button, styles[variant], className)

  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  )
}

export default LinkButton
