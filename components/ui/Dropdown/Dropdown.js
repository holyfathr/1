import { Children, forwardRef, useRef } from "react"
import clsx from "clsx"
import { mergeRefs } from "react-merge-refs"
import useClickOutside from "use-click-outside"

import Icon from "components/ui/Icon"

import useToggle from "hooks/use-toggle"

import styles from "./dropdown.module.scss"

const Dropdown = (
  {
    placeholder,
    icon = "arrow-down",
    iconFlippable = true,
    className,
    hasError,
    children,
    variant = "default",
    readOnly,
    onClick,
    ...props
  },
  ref
) => {
  const [open, toggleOpen] = useToggle(false)

  const innerRef = useRef(null)
  useClickOutside(innerRef, () => open && toggleOpen())

  className = clsx(
    styles.select,
    open && styles.open,
    iconFlippable && styles.flippable,
    hasError && styles.error,
    readOnly && styles.readOnly,
    styles[variant],
    className
  )

  const onRequestToggle = (event) => {
    onClick && onClick(event)

    if (readOnly) return
    // Clicked inside
    if (event.target.className !== className) return
    if (Children.count(children) === 0) return

    toggleOpen()
  }

  return (
    <button
      className={className}
      type="button"
      onClick={onRequestToggle}
      {...props}
      ref={mergeRefs([innerRef, ref])}
    >
      <span className={styles.placeholder}>{placeholder}</span>

      <span className={styles.iconWrapper}>
        <Icon slug={icon} className={styles.icon} />
      </span>

      <span className={styles.optionsWrapper}>
        <span className={styles.options}>{children}</span>
      </span>
    </button>
  )
}

export default forwardRef(Dropdown)
