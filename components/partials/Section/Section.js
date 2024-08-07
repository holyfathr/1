import clsx from "clsx"

import styles from "./section.module.scss"

const Section = ({ isRounded, children, className, ...props }) => {
  className = clsx(isRounded && styles.rounded, className)

  return (
    <section className={className} {...props}>
      {children}
    </section>
  )
}

export default Section
