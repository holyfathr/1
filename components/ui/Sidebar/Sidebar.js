import NextLink from "next/link"
import clsx from "clsx"

import Icon from "components/ui/Icon"

import useLinkIsActive from "hooks/use-link-is-active"

import styles from "./sidebar.module.scss"

const Sidebar = ({ children, className, ...props }) => {
  className = clsx(styles.sidebar, className)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

const Link = ({ href, icon, children, className, ...props }) => {
  const active = useLinkIsActive(href)

  className = clsx(styles.link, active && styles.active, className)

  return (
    <NextLink href={href} {...props}>
      <a className={className}>
        <Icon slug={icon} className={styles.icon} />
        <span>{children}</span>
      </a>
    </NextLink>
  )
}

Sidebar.Link = Link

export default Sidebar
