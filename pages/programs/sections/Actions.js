import clsx from "clsx"

import Button from "components/ui/Button"

import { formatDate } from "helpers/language"

import styles from "./actions.module.scss"

const Actions = ({ program }) => (
  <div className={styles.actions}>
    <Button className={styles.button} href="/application/">
      Подать заявку
    </Button>

    {program.closing_date && (
      <p className={clsx(styles.description, styles.descriptionAlternate)}>
        {formatDate(
          program.closing_date,
        )}
        {" - "}окончание приёма документов на поступление
      </p>
    )}
  </div>
)

export default Actions
