import clsx from "clsx"

import styles from "./events-grid.module.scss"

const EventsGrid = ({ className, children, ...props }) => {
  className = clsx(styles.grid, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default EventsGrid
