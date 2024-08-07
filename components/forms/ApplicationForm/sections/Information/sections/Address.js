import { Controller, useFormContext } from "react-hook-form"

import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import AddressInput from "components/ui/AddressInput"
import Select from "components/ui/Select"

import styles from "../information.module.scss"

const Address = ({ overview }) => {
  const { formState, control } = useFormContext()

  return (
    <Subsection title="Адрес" contentClassName={styles.rowInputs}>
      <Label
        title={overview ? "Адрес прописки" : "Адрес твоей прописки*"}
        hasError={formState.errors.entrant?.passport_info?.address}
        className={styles.address}
      >
        <Controller
          name="entrant.passport_info.address"
          control={control}
          render={({ field }) => (
            <AddressInput
              placeholder="То что на 7 странице паспорта"
              readOnly={overview}
              hasError={formState.errors.entrant?.passport_info?.address}
              {...field}
            />
          )}
        />
      </Label>

      <Label title="Общежитие*" hasError={formState.errors.needs_dormitory}>
        <Controller
          control={control}
          name="needs_dormitory"
          render={({ field }) => (
            <Select
              placeholder="Выбери"
              variant="thin"
              hasError={formState.errors.needs_dormitory}
              readOnly={overview}
              options={[
                { value: true, label: "Нуждаюсь" },
                { value: false, label: "Не нуждаюсь" },
              ]}
              {...field}
            />
          )}
        />
      </Label>
    </Subsection>
  )
}

export default Address
