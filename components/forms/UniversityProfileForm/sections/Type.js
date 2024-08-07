import { Controller, useFormContext } from "react-hook-form"

import Subsection from "components/ui/Subsection"
import Radio from "components/ui/Radio"

import styles from "../university-profile-form.module.scss"

const Type = () => {
  const { control } = useFormContext()

  return (
    <Subsection title="Выберите тип вашего вуза:" contentClassName={styles.wrapper}>
      <Controller
        control={control}
        name="is_national"
        render={({ field: { onChange, value } }) => (
          <div className={styles.inlineInputs}>
            <Radio onChange={() => onChange(true)} checked={value === true}>
              Государственный
            </Radio>
            <Radio onChange={() => onChange(false)} checked={value === false}>
              Частный
            </Radio>
          </div>
        )}
      />
    </Subsection>
  )
}

export default Type
