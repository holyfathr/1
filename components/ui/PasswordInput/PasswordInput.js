import clsx from "clsx"
import { forwardRef } from "react"

import EyeToggle from "components/ui/EyeToggle"
import Input from "components/ui/Input"

import useToggle from "hooks/use-toggle"

import styles from "./password-input.module.scss"

const PasswordInput = ({ className, ...props }, ref) => {
  const [visible, toggleVisible] = useToggle(false)

  className = clsx(styles.wrapper, className)

  return (
    <div className={className}>
      <Input
        className={styles.input}
        {...props}
        type={visible ? "text" : "password"}
        ref={ref}
      />

      <EyeToggle className={styles.toggle} onClick={toggleVisible} />
    </div>
  )
}

export default forwardRef(PasswordInput)
