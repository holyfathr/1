import clsx from "clsx"
import Link from "next/link"

import useLinkIsActive from "hooks/use-link-is-active"

import styles from "./menu.module.scss"

const Menu = ({ children, className, ...props }) => {
  className = clsx(styles.menu, className)

  return (
    <nav className={className} {...props}>
      {children}
    </nav>
  )
}

const MenuLink = ({ href, children, className, ...props }) => {
  const isActive = useLinkIsActive(href)

  className = clsx(styles.link, isActive && styles.active, className)

  return (
    <Link href={href}>
      <a className={className} {...props}>
        <span className={styles.text}>{children}</span>
        <span className={styles.bold}>{children}</span>
      </a>
    </Link>
  )
}

Menu.Link = MenuLink

export default Menu
