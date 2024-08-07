import clsx from "clsx"

import IconButton from "components/ui/IconButton"

import styles from "./subjinput.module.scss"
const SubjInput = (
  { title, hasError, onDelete, className, ...props },
  ref
) => {

  className = clsx(styles.wrapper, hasError && styles.error, className)

  return (
    <div className={className}>
      {onDelete && (
        <IconButton
          icon="trash"
          variant="danger"
          className={styles.button}
          onClick={onDelete}
        />
      )}
      <label>
        <span>{title}</span>
      </label>
    </div>
  )
}

export default SubjInput
