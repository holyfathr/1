import clsx from "clsx"

import Icon from "components/ui/Icon"

import styles from "./stat-card.module.scss"

const StatCard = ({ icon, title, value, className, ...props }) => {
  className = clsx(styles.card, className)

  return (
    <div className={className} {...props}>
      {icon && (
        <div className={styles.iconWrapper}>
          <Icon slug={icon} className={styles.icon} />
        </div>
      )}

      {value && (
        <div className={styles.infoWrapper}>
          <p className={styles.title}>{title}</p>
          <p className={styles.value}>{value}</p>
        </div>
      )}
      {!value && (
        <div className={styles.infoWrapper}>
          <p className={styles.title}>{title}</p>
        </div>

      )}
    </div>
  )
}

export default StatCard
