import { useMemo } from "react"
import clsx from "clsx"

import { getTrainingFormTitle } from "helpers/enums"

import styles from "./training-form.module.scss"

const TrainingForm = ({ form, className, ...props }) => {
  const title = useMemo(() => getTrainingFormTitle(form), [form])

  className = clsx(styles.form, className)

  return (
    <div className={className} {...props}>
      {title}
    </div>
  )
}

export default TrainingForm
