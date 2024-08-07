import clsx from "clsx"
import Image from "next/image"

import styles from "./illustration-message.module.scss"

const IllustrationMessage = ({
  illustration,
  title,
  children,
  className,
  contentClassName,
  ...props
}) => {
  className = clsx(styles.message, className)
  contentClassName = clsx(styles.content, contentClassName)

  return (
    <div className={className} {...props}>
      <Image
        src={`/images/illustrations/${illustration}.svg`}
        width={400}
        height={297}
        alt=""
      />
      <h1 className={styles.title}>{title}</h1>
      <div className={contentClassName}>{children}</div>
    </div>
  )
}

export default IllustrationMessage
