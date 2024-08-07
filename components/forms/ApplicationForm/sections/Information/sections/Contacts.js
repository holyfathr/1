import { useFormContext, Controller } from "react-hook-form";
import Label from "components/ui/Label";
import Subsection from "components/ui/Subsection";
// import PhoneInput from "components/ui/PhoneInput";
import Input from "components/ui/Input";
import PhoneInput from "components/ui/PhoneInput"

import styles from "../information.module.scss";

const Contacts = ({ overview }) => {
  const { formState, register, control } = useFormContext();

  return (
    <Subsection title="Контактные данные" contentClassName={styles.rowInputs}>
      <Label
        title={overview ? "E-mail" : "Твой E-mail*"}
        hasError={formState.errors.contact?.email}
      >
        <Input type="email" {...register("contact.email")} readOnly={overview} disabled/>
      </Label>

      <Label
        title={overview ? "Телефон" : "Твой телефон*"}
        hasError={formState.errors.entrant?.phone_number}
      >
        <PhoneInput {...register("entrant.phone_number")} disabled readOnly={overview} />
      </Label>
    </Subsection>
  );
}

export default Contacts;
