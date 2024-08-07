import clsx from "clsx"
import Image from "next/image"

import styles from "./icon.module.scss"

const Icon = ({ slug, className, ...props }) => {
  className = clsx(styles.icon, className)

  return (
    <div className={className} {...props}>
      <Image src={`/images/icons/${slug}.svg`} layout="fill" alt="" objectFit="contain" />
    </div>
  )
}

export default Icon
