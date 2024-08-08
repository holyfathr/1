import Label from "components/ui/Label";
import Subsection from "components/ui/Subsection";

import styles from "../applications.module.scss";

const Contacts = ({ application }) => {

  return (
    <Subsection title="Контактные данные" contentClassName={styles.rowInputs}>
      <Label title="E-mail">
        {application.email}
      </Label>

      <Label title="Телефон">
        {`+ ${application.entrant_obj.phone_number}`}
      </Label>
    </Subsection>
  );
}

export default Contacts;
