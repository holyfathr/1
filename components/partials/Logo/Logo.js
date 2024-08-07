import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

import styles from "./logo.module.scss"

const Logo = ({ isPro, className, ...props }) => {
  className = clsx(styles.logo, isPro && styles.pro, className)

  return (
    <Link href="/">
      <a className={className} {...props}>
        <Image
          src={"/images/logos/almater.svg"}
          alt=""
          layout="fill"
        />
      </a>
    </Link>
  )
}

export default Logo
