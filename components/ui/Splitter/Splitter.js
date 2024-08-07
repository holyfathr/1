import clsx from "clsx"

import styles from "./splitter.module.scss"

const Splitter = ({ className, children, ...props }) => {
  className = clsx(styles.splitter, className)

  return (
    <div className={className} {...props}>
      <p className={styles.text}>{children}</p>
    </div>
  )
}

export default Splitter
