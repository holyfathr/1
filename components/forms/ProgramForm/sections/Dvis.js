import { Controller, useFieldArray, useFormContext } from "react-hook-form"

import EditableSubsection from "components/partials/EditableSubsection"
import ActionButton from "components/ui/ActionButton"
import DateInput from "components/ui/DateInput"
import Input from "components/ui/Input"
import Label from "components/ui/Label"

import styles from "../program-form.module.scss"

const EMPTY_DVI = {
  date: "",
  description: "",
}

const Dvis = () => {
  const { control } = useFormContext()
  const { fields: dvis, append, remove } = useFieldArray({ control, name: "dvis" })

  const onAdd = () => append(EMPTY_DVI, { shouldFocus: false })
  const onDelete = (index) => remove(index)

  return (
    <EditableSubsection title="ДВИ" onAdd={onAdd}>
      {(editing) => (
        <div className={styles.inputs}>
          {dvis.map((dvi, index) => (
            <Dvi index={index} key={dvi.id} onDelete={editing ? onDelete : undefined} />
          ))}
        </div>
      )}
    </EditableSubsection>
  )
}

const Dvi = ({ index, onDelete }) => {
  const { register, formState, control } = useFormContext()

  const preDelete = onDelete ? () => onDelete(index) : undefined

  return (
    <div className={styles.dvi}>
      <Label title="Дата" hasError={formState.errors.dvis?.[index]?.date}>
        <Controller
          control={control}
          name={`dvis.${index}.date`}
          render={({ field }) => (
            <DateInput hasError={formState.errors.dvis?.[index]?.date} {...field} />
          )}
        />
      </Label>

      <Label title="Название" hasError={formState.errors.dvis?.[index]?.description}>
        <Input {...register(`dvis.${index}.description`)} />
      </Label>

      {preDelete && (
        <ActionButton icon="trash" variant="danger" onClick={preDelete}>
          Удалить
        </ActionButton>
      )}
    </div>
  )
}

export default Dvis
