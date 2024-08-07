import clsx from "clsx"

import Card from "components/ui/Card"

import styles from "./statuses-card.module.scss"

const StatusesCard = ({ children, className, ...props }) => {
  className = clsx(styles.wrapper, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

const Statuses = ({ children, className, ...props }) => {
  className = clsx(styles.statusesWrapper, className)

  return (
    <div className={className} {...props}>
      <div className={styles.statuses}>{children}</div>
    </div>
  )
}

const Header = ({ children, className, ...props }) => {
  className = clsx(styles.headerWrapper, className)

  return (
    <div className={className} {...props}>
      <div className={styles.header}>{children}</div>
    </div>
  )
}

StatusesCard.Content = Card
StatusesCard.Statuses = Statuses
StatusesCard.Header = Header

export default StatusesCard
