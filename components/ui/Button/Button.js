import clsx from "clsx"
import Link from "next/link"
import { forwardRef } from "react"

import styles from "./button.module.scss"

const Button = (
  { variant = "default", tiny, href, className, children, ...props },
  ref
) => {
  className = clsx(styles.button, styles[variant], tiny && styles.tiny, className)

  if (href)
    return (
      <Link href={href}>
        <a className={className} {...props}>
          {children}
        </a>
      </Link>
    )

  return (
    <button className={className} type="button" {...props} ref={ref}>
      {children}
    </button>
  )
}

export default forwardRef(Button)
