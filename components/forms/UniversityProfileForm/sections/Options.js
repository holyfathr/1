import { useFormContext } from "react-hook-form"

import Checkbox from "components/ui/Checkbox"
import Subsection from "components/ui/Subsection"

import styles from "../university-profile-form.module.scss"

const Options = () => {
  const { register } = useFormContext()

  return (
    <Subsection title="Предоставляем" contentClassName={styles.inlineInputs}>
      <Checkbox {...register("has_visa_support")}>Визу</Checkbox>
      <Checkbox {...register("has_migration_support")}>Миграционное сопровождение</Checkbox>
      <Checkbox {...register("is_dormitory_available")}>
        Общежитие
      </Checkbox>
    </Subsection>
  )
}

export default Options
