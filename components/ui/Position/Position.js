import { useMemo } from "react"
import clsx from "clsx"

import { formatDate } from "helpers/language"

import styles from "./position.module.scss"

const Position = ({ date, children, className, ...props }) => {
  const formattedDate = useMemo(() => formatDate(date, "d MMMM yyyy HH:mm"), [date])

  className = clsx(styles.position, className)

  return (
    <div className={className} {...props}>
      <strong>
        <mark>Рейтинг: {children}</mark>
      </strong>

      {formattedDate && <p className={styles.date}>на {formattedDate}</p>}
    </div>
  )
}

export default Position
