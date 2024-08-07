import clsx from "clsx"

import Icon from "components/ui/Icon"

import styles from "./icon-label.module.scss"

const IconLabel = ({ icon, variant = "default", className, children, ...props }) => {
  className = clsx(styles.label, styles[variant], className)

  return (
    <div className={className} {...props}>
      <div className={styles.wrapper}>
        <Icon className={styles.icon} slug={icon} />
      </div>

      <div className={styles.label}>{children}</div>
    </div>
  )
}

export default IconLabel
