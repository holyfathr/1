import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import get from "lodash/get"

import Subsection from "components/ui/Subsection"
import Label from "components/ui/Label"
import Select from "components/ui/Select"
import Input from "components/ui/Input"
import DateInput from "components/ui/DateInput"
import FileUploadContainer from "components/containers/FileUploadContainer"
import NumberInput from "components/ui/NumberInput"
import Button from "components/ui/Button"

import styles from "../information.module.scss"

const EMPTY_ACHIEVEMENT = {
  type: "",
  serial_number: "",
  number: "",
  date_of_issue: "",
  issued_by: "",
  file_link: "",
}

const Achievements = ({ overview }) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: "achievements" })

  const onAdd = () => append(EMPTY_ACHIEVEMENT, { shouldFocus: false })
  const onDelete = (index) => remove(index)

  if (!fields.length && overview) return null

  return (
    <Subsection title="Индивидуальные достижения" contentClassName={styles.rowInputs}>
      {fields.map((field, index) => (
        <Achievement
          key={field.id}
          overview={overview}
          onDelete={() => onDelete(index)}
          index={index}
        />
      ))}

      {!overview && <AddButton onClick={onAdd} />}
    </Subsection>
  )
}

const AddButton = (props) => (
  <Button className={styles.button} variant="ghost" {...props}>
    Добавить
  </Button>
)

const DeleteButton = (props) => (
  <Button className={styles.button} variant="dangerGhost" {...props}>
    Удалить
  </Button>
)

const Achievement = ({ overview, onDelete, index }) => {
  const { control, register, formState } = useFormContext()

  return (
    <>
      <Label
        title="Тип достижения*"
        hasError={get(formState.errors, `achievements[${index}].type`)}
      >
        <Controller
          control={control}
          name={`achievements.${index}.type`}
          render={({ field }) => (
            <Select
              placeholder="Выбери"
              variant="thin"
              hasError={get(formState.errors, `achievements[${index}].type`)}
              readOnly={overview}
              options={[{ label: "Тест", value: "test" }]}
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Серия"
        hasError={get(formState.errors, `achievements[${index}].serial_number`)}
      >
        <Controller
          name={`achievements.${index}.serial_number`}
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <NumberInput
              onValueChange={({ floatValue }) => onChange(floatValue)}
              readOnly={overview}
              hasError={get(formState.errors, `achievements[${index}].serial_number`)}
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Номер*"
        hasError={get(formState.errors, `achievements[${index}].number`)}
      >
        <Controller
          name={`achievements.${index}.number`}
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <NumberInput
              onValueChange={({ floatValue }) => onChange(floatValue)}
              readOnly={overview}
              hasError={get(formState.errors, `achievements[${index}].number`)}
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Дата выдачи*"
        hasError={get(formState.errors, `achievements[${index}].date_of_issue`)}
      >
        <Controller
          control={control}
          name={`achievements.${index}.date_of_issue`}
          render={({ field }) => (
            <DateInput
              readOnly={overview}
              hasError={formState.errors.achievements?.[index]?.date_of_issue}
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Кем выдан*"
        hasError={get(formState.errors, `achievements[${index}].issued_by`)}
      >
        <Input {...register(`achievements.${index}.issued_by`)} readOnly={overview} />
      </Label>

      {overview ? <span /> : <DeleteButton onClick={onDelete} />}

      <Controller
        control={control}
        name={`achievements.${index}.file_link`}
        render={({ field }) => (
          <FileUploadContainer
            title="Фото диплома/документа*"
            description="(jpeg, png, PDF)"
            accept="image/jpeg,image/png,application/pdf"
            variant="tiny"
            className={styles.upload}
            readOnly={overview}
            hasError={get(formState.errors, `achievements[${index}].file_link`)}
            {...field}
          />
        )}
      />

      <span />
      <span />
    </>
  )
}

export default Achievements
