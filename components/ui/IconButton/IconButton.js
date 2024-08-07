import clsx from "clsx"

import Icon from "components/ui/Icon"

import styles from "./icon-button.module.scss"

const IconButton = ({ icon, variant = "default", className, ...props }) => {
  className = clsx(styles.button, styles[variant], className)

  return (
    <button className={className} type="button" {...props}>
      <Icon slug={icon} className={styles.icon} />
    </button>
  )
}

export default IconButton
