import clsx from "clsx"

import styles from "./content.module.scss"

const Content = ({ children, className, ...props }) => {
  className = clsx(styles.content, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default Content
