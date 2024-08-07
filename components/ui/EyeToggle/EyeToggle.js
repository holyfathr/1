import clsx from "clsx"

import Icon from "components/ui/Icon"

import useToggle from "hooks/use-toggle"

import styles from "./eye-toggle.module.scss"

const EyeToggle = ({ toggled: initialToggled = false, onClick, className, ...props }) => {
  const [toggled, toggle] = useToggle(initialToggled)

  const preClick = (event) => {
    toggle()
    onClick && onClick(event)
  }

  className = clsx(styles.toggle, className)

  return (
    <button className={className} onClick={preClick} type="button" {...props}>
      <Icon slug={toggled ? "eye-open" : "eye-closed"} className={styles.icon} />
    </button>
  )
}

export default EyeToggle
