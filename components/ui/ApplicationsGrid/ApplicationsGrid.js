import clsx from "clsx"

import styles from "./applications-grid.module.scss"

const ApplicationsGrid = ({ children, className, ...props }) => {
  className = clsx(styles.grid, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default ApplicationsGrid
