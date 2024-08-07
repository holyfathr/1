import { Controller, useFormContext } from "react-hook-form"

import Subsection from "components/ui/Subsection"
import Radio from "components/ui/Radio"

import styles from "../university-profile-form.module.scss"

const Admission = () => {
  const { control } = useFormContext()

  return (
    <Subsection title="Кто занимается приёмной кампанией?">
      <Controller
        control={control}
        name="is_university_admission_campaign"
        render={({ field: { onChange, value } }) => (
          <div className={styles.inlineInputs}>
            <Radio onChange={() => onChange(false)} checked={value === false}>
              Каждый факультет отдельно
            </Radio>
            <Radio onChange={() => onChange(true)} checked={value === true}>
              Сам вуз за все факультеты
            </Radio>
          </div>
        )}
      />
    </Subsection>
  )
}

export default Admission
