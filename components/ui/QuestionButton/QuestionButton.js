import clsx from "clsx"

import IconButton from "components/ui/IconButton"

import styles from "./question-button.module.scss"

const QuestionButton = ({ className, ...props }) => {
  className = clsx(styles.button, className)

  return <IconButton icon="question" className={className} {...props} />
}

export default QuestionButton
