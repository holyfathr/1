import clsx from "clsx"

import FullWidth from "components/ui/FullWidth"
import ScrollLine from "components/ui/ScrollLine"

import styles from "./full-width-scroll-line.module.scss"

const FullWidthScrollLine = ({ children, className, ...props }) => {
  className = clsx(styles.line, className)

  return (
    <FullWidth className={styles.wrapper} {...props}>
      <ScrollLine className={className}>{children}</ScrollLine>
    </FullWidth>
  )
}

export default FullWidthScrollLine
