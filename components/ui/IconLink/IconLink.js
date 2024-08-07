import clsx from "clsx"
import Link from "next/link"

import Icon from "components/ui/Icon"

import styles from "./icon-link.module.scss"

const IconLink = ({ icon, href, className, ...props }) => {
  className = clsx(styles.link, className)

  return (
    <Link href={href}>
      <a className={className} {...props}>
        <Icon slug={icon} className={styles.icon} />
      </a>
    </Link>
  )
}

export default IconLink
