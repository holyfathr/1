import Subsection from "components/ui/Subsection"
import Label from "components/ui/Label"

import styles from "./application-review.module.scss";

const Additional = ({ application }) => {

  return(
    <Subsection title="Дополнительные сведения">
      <div className={styles.rowInputs}>
        <Label
          title="Уровень знания русского языка">
          {application.entrant.russian_knowledge_level}
        </Label>

        <Label
          title="Требуется общежитие">
          {application.needs_dormitory ? "Да" : "Нет"}
        </Label>
      </div>
    </Subsection>
  )
}
export default Additional