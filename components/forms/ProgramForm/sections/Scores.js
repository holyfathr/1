import { useFormContext } from "react-hook-form"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import IntegerInput from "components/ui/IntegerInput"
import InputsCloud from "components/ui/InputsCloud"

import styles from "../program-form.module.scss"

const Scores = () => {
  const { register, formState } = useFormContext()

  return (
    <div className={styles.inputs}>
      <p>Напишите проходной балл в прошлом году*</p>
      <InputsCloud>
        <IntegerInput
          min={0}
          max={999}
          title="Проходной"
          hasError={formState.errors.last_year_passing_score}
          {...register("last_year_passing_score", { valueAsNumber: true })}
        />
      </InputsCloud>

      <Label
        title="Ссылка на список индивидуальных достижений"
        hasError={formState.errors.link_to_individual_achievements}
      >
        <Input {...register("link_to_individual_achievements")} type="url" />
      </Label>
    </div>
  )
}

export default Scores
