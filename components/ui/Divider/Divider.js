import clsx from "clsx"

import styles from "./divider.module.scss"

const Divider = ({ className, ...props }) => {
  className = clsx(styles.divider, className)

  return <div className={className} {...props} />
}

export default Divider
