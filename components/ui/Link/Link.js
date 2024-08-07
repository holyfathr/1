import clsx from "clsx"
import NextLink from "next/link"

import styles from "./link.module.scss"

const Link = ({ className, variant = "default", children, href, locale, ...props }) => {
  className = clsx(styles.link, styles[variant], className)

  return (
    <NextLink href={href} locale={locale}>
      <a className={className} {...props}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link