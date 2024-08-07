import clsx from "clsx"

import IconButton from "components/ui/IconButton"

import styles from "./burger-button.module.scss"

const BurgerButton = ({ active, className, ...props }) => {
  className = clsx(styles.button, active && styles.active, className)

  return (
    <IconButton
      icon={active ? "cross" : "burger"}
      variant="accent"
      className={className}
      {...props}
    />
  )
}

export default BurgerButton
