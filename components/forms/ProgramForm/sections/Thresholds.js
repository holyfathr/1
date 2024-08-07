import { useState } from "react"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"

import Subsection from "components/ui/Subsection"
import ResultsInput from "components/ui/ResultsInput"
import ActionButton from "components/ui/ActionButton"
import SubjectsPicker from "components/ui/SubjectsPicker"

import { renameKeys } from "helpers/objects"

import styles from "../program-form.module.scss"

const Thresholds = () => {
  const { control } = useFormContext()
  const { 
    fields: thresholds,
    append,
    remove,
  } = useFieldArray({ name: "use_thresholds", control })

  return (
    <Subsection title="Критерии отбора" contentClassName={styles.inputs}>
      {thresholds.map((threshold, index) => (
        <Threshold index={index} key={threshold.id} onDelete={remove} />
      ))}

      <ActionButton icon="plus" variant="accent" onClick={() => append()}>
        Добавить
      </ActionButton>
    </Subsection>
  )
}

const Threshold = ({ index, onDelete }) => {
  const { control, getValues } = useFormContext()

  const [subjects, setSubjects] = useState(() => {
    const threshold = getValues(`use_thresholds.${index}`) || []
    return threshold.map((t) => renameKeys(t, { use: "id", use_title: "exam_title" }))
  })

  const onResultDelete = (deletedIndex) => {
    const newSubjects = subjects.filter((_, i) => i !== deletedIndex)
    if (newSubjects.length === 0) return onDelete(index)
    setSubjects(newSubjects)
  }

  return (
    <div className={styles.threshold}>
      <p className={styles.priority}>{index + 1}</p>

      <SubjectsPicker
        value={subjects}
        onChange={setSubjects}
        className={styles.subjects}
      />

      <Controller
        control={control}
        name={`use_thresholds.${index}`}
        defaultValue={[]}
        render={({ field }) => (
          <ResultsInput
            subjects={subjects}
            idKey="use"
            valueKey="use_threshold"
            onDelete={onResultDelete}
            {...field}
          />
        )}
      />
    </div>
  )
}

export default Thresholds
