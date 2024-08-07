import clsx from "clsx"
import { forwardRef } from "react"
import VerificationInput from "react-verification-input"

import styles from "./code-input.module.scss"

const CodeInput = ({ length = 4, className, ...props }, ref) => {
  return (
    <VerificationInput
      validChars="0-9"
      placeholder="_"
      autoFocus
      removeDefaultStyles
      length={length}
      classNames={{
        character: styles.character,
        characterSelected: styles.selected,
        characterInactive: styles.inactive,
        container: clsx(styles.container, className),
      }}
      {...props}
      ref={ref}
    />
  )
}

export default forwardRef(CodeInput)
