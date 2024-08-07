import clsx from "clsx"

import styles from "./status-card.module.scss"

const StatusCard = ({ completed, children, className, ...props }) => {
  className = clsx(styles.card, completed && styles.completed, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default StatusCard
