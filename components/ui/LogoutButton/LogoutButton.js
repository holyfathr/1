import clsx from "clsx"
import Link from "next/link"

import styles from "./logout-button.module.scss"

const LogoutButton = ({ href, className, ...props }) => {
  className = clsx(styles.button, className)

  return (
    <Link href={href}>
      <a className={className} title="Выйти" {...props}>
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 18"
          className={styles.icon}
        >
          <path d="M11 1H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8" />
          <path d="m19 13 4-4m0 0-4-4m4 4H10" className={styles.arrow} />
        </svg>
      </a>
    </Link>
  )
}

export default LogoutButton
