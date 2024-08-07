import { useEffect } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"

import Subsection from "components/ui/Subsection"
import ResultsInput from "components/ui/ResultsInput"

const ExamResults = () => {
  const { control, getValues, setValue, formState } = useFormContext()
  const subjects = useWatch({ name: "subjects", control })

  useEffect(() => {
    const results = getValues("exam_results")

    if (subjects.length === 0 && results.length > 0) {
      setValue("exam_results", [])
    }
  }, [subjects.length, getValues, setValue])

  if (!subjects.length) return null

  return (
    <Subsection
      title="Введи количество баллов по этим предметам"
      hasError={formState.errors.exam_results}
    >
      <Controller
        control={control}
        name="exam_results"
        render={({ field }) => (
          <ResultsInput
            subjects={subjects}
            valueKey="exam_result"
            idKey="exam"
            {...field}
          />
        )}
      />
    </Subsection>
  )
}

export default ExamResults
