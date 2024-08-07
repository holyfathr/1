import clsx from "clsx"

import Highlight from "components/ui/Highlight"

import { getFormOfEducationTitle } from "helpers/enums"
import { formatPrice } from "helpers/language"

import styles from "./program-highlights.module.scss"

const ProgramHighlights = ({ program, className, ...props }) => {
  className = clsx(styles.highlights, className)

  return (
    <div className={className} {...props}>
      {program.duration && (
        <Highlight title={program.duration}>Период обучения</Highlight>
      )}

      {program.form_of_education && (
        <Highlight title={getFormOfEducationTitle(program.form_of_education)}>
          Форма обучения
        </Highlight>
      )}

      {Number.isFinite(program.commerce_cost) && (
        <Highlight title={formatPrice(program.commerce_cost)}>Стоимость</Highlight>
      )}
    </div>
  )
}

export default ProgramHighlights
