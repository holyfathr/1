import Label from "components/ui/Label";
import Subsection from "components/ui/Subsection";

import styles from "./application-review.module.scss";

const Contacts = ({ application }) => {

  return (
    <Subsection title="Контактные данные" contentClassName={styles.rowInputs}>
      <Label title="E-mail">
        {application.email}
      </Label>

      <Label title="Телефон">
        {`+ ${application.entrant.phone_number}`}
      </Label>
    </Subsection>
  );
}

export default Contacts;
