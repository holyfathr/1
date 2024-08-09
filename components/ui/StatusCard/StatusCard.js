import clsx from "clsx"

import styles from "./status-card.module.scss"

const StatusCard = ({ warning, secondary, completed, children, className, ...props }) => {
  className = clsx(
    styles.card,
    completed && styles.completed,
    secondary && styles.waiting,
    warning && styles.warning,
    className
  )

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default StatusCard
