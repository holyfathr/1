import clsx from "clsx"

import styles from "./programs-grid.module.scss"

const ProgramsGrid = ({ children, className, ...props }) => {
  className = clsx(styles.grid, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default ProgramsGrid
