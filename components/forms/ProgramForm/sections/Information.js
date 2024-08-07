import { Controller, useFormContext } from "react-hook-form"

import Checkbox from "components/ui/Checkbox"
import Input from "components/ui/Input"
import Label from "components/ui/Label"
import Select from "components/ui/Select"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import styles from "../program-form.module.scss"

const Information = () => {
  const { register, control, formState } = useFormContext()

  const { data: forms, isLoading: isFormsLoading } = useDefinedQuery(
    keys.formsOfEducation
  )
  const { data: levels, isLoading: isLevelsLoading } = useDefinedQuery(
    keys.levelsOfEducation
  )

  return (
    <div className={styles.info}>
      <div className={styles.information}>
        <Label title="Формат обучения*" hasError={formState.errors.form_of_education}>
          <Controller
            control={control}
            name="form_of_education"
            defaultValue="О"
            render={({ field }) => (
              <Select
                placeholder={isFormsLoading ? "Загрузка..." : "Выберите"}
                hasError={formState.errors.form_of_education}
                variant="thin"
                disabled={isFormsLoading}
                options={forms}
                {...field}
              />
            )}
          />
        </Label>

        <Label title="Уровень образования*" hasError={formState.errors.level_of_education}>
          <Controller
            control={control}
            name="level_of_education"
            defaultValue="B"
            render={({ field }) => (
              <Select
                placeholder={isLevelsLoading ? "Загрузка..." : "Выберите"}
                hasError={formState.errors.level_of_education}
                variant="thin"
                disabled={isLevelsLoading}
                options={levels}
                {...field}
              />
            )}
          />
        </Label>

        <Label title="Код направления (опционально)" hasError={formState.errors.discipline_code}>
          <Input {...register("discipline_code")} placeholder="XX.XX.XX"/>
        </Label>
      </div>  
      {/* <Checkbox
        {...register("has_gov_accreditation")}
        hasError={formState.errors.has_gov_accreditation}
        variant="outline"
      >
        Гос. аккредитация есть
      </Checkbox> */}

      <Label
        title="Полное название*"
        className={styles.title}
        hasError={formState.errors.title}
      >
        <Input {...register("title")} />
      </Label>
    </div>
  )
}

export default Information
