import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"

import { getCitizenship } from "helpers/enums";

import styles from "../applications.module.scss";

const NationalityDetails = ({ application }) => {

  return (
    <Subsection title="Данные о гражданстве">
      <span className={styles.rowInputs}>
        <Label title="Гражданство">
          {application.entrant_obj.citizenship}
        </Label>
          
        <Label title="Где ты планируешь податься на визу?">
          {application.visa_city}
        </Label>
      </span>
    </Subsection>
  )
}

export default NationalityDetails