import { Controller, useFormContext } from "react-hook-form"

import Subsection from "components/ui/Subsection"
import Label from "components/ui/Label"
import Select from "components/ui/Select"

import styles from "../information.module.scss"

const Additional = ({ overview }) => {
  const { control, formState } = useFormContext()

  return(
    <Subsection title="Дополнительные сведения">
      <div className={styles.rowInputs}>
        <Label
          title="Уровень знания русского языка*"
          hasError={formState.errors.entrant?.russian_knowledge_level}
        >
          <Controller
            control={control}
            name="entrant.russian_knowledge_level"
            render={({ field }) => (
              <Select
                placeholder="Выбери опцию"
                variant="thin"
                valueKey="label"
                hasError={formState.errors.entrant?.russian_knowledge_level}
                readOnly={overview}
                options={[
                    { value: "N", label: "Не знаю" },
                    { value: "A1", label: "A1" },
                    { value: "A2", label: "A2" },
                    { value: "B1", label: "B1" },
                    { value: "B2", label: "B2" },
                    { value: "C1", label: "C1" },
                    { value: "C2", label: "C2" },
                  ]}
                {...field}
              />
            )}
          />
        </Label>

        <Label
          title="Требуется общежитие?*"
          hasError={formState.errors.entrant?.needs_dormitory}
        >
          <Controller
            control={control}
            name="entrant.needs_dormitory"
            render={({ field }) => (
              <Select
                placeholder="Выбери"
                variant="thin"
                hasError={formState.errors.entrant?.needs_dormitory}
                readOnly={overview}
                options={[
                  { value: true, label: "Да" },
                  { value: false, label: "Нет" },
                ]}
                {...field}
              />
            )}
          />
        </Label>
      </div>
    </Subsection>
  )
}
export default Additional