import clsx from "clsx"
import { forwardRef } from "react"

import styles from "./inputs-cloud.module.scss"

const InputsCloud = ({ className, children, ...props }, ref) => {
  className = clsx(styles.cloud, className)

  return (
    <div className={className} {...props} ref={ref}>
      {children}
    </div>
  )
}

export default forwardRef(InputsCloud)
