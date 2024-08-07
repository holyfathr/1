import clsx from "clsx"

import ActionButton from "components/ui/ActionButton"
import Card from "components/ui/Card"

import { formatCount } from "helpers/language"

import styles from "./faculty-card.module.scss"

const FacultyCard = ({ faculty, className, ...props }) => {
  className = clsx(styles.card, className)

  return (
    <Card as="article" className={className} {...props}>
      <div>
        <strong className={styles.title}>{faculty.title}</strong>
        <p className={styles.description}>
          {formatCount(
            faculty.educational_program_count,
            "Образовательная программа",
            "Образовательных программы",
            "Образовательных программ"
          )}
        </p>
      </div>

      <ActionButton
        href={`/faculties/${faculty.id}/`}
        variant="outline"
        icon="arrow-right"
        className={styles.button}
      >
        Перейти
      </ActionButton>
    </Card>
  )
}

export default FacultyCard
