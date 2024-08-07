import { forwardRef } from "react"
import clsx from "clsx"

import Input from "components/ui/Input"
import Icon from "components/ui/Icon"

import styles from "./search-bar.module.scss"

const SearchBar = ({ variant = "default", placeholder, className, ...props }, ref) => {
  className = clsx(styles.bar, styles[variant], className)

  return (
    <div className={className}>
      <Input placeholder={placeholder} className={styles.input} ref={ref} {...props} />
      <div className={styles.overflow} />
      <button className={styles.button}>
        <Icon slug="magnifier" className={styles.icon} />
      </button>
    </div>
  )
}

export default forwardRef(SearchBar)
