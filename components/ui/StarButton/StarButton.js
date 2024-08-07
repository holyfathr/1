import clsx from "clsx"

import Icon from "components/ui/Icon"

import styles from "./star-button.module.scss"

const StarButton = ({ active, className, disabled, ...props }) => {
  className = clsx(
    styles.button,
    active && styles.active,
    disabled && styles.disabled,
    className
  )

  return (
    <button className={className} disabled={disabled} {...props}>
      <Icon slug={active ? "star-filled" : "star"} className={styles.icon} />
    </button>
  )
}

export default StarButton
