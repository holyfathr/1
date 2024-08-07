import clsx from "clsx"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { useEffect } from "react"
import extend from "lodash/extend"

import Subsection from "components/ui/Subsection"
import Label from "components/ui/Label"
import NumberInput from "components/ui/NumberInput"
import ResultsInput from "components/ui/ResultsInput"

import styles from "../information.module.scss"

const Results = ({ subjects, overview }) => {
  const { formState, control, setValue, getValues } = useFormContext()
  const year = useWatch({ name: "entrant.exam_year" })

  useEffect(() => {
    const results = getValues("entrant.exam_results")

    for (let i = 0; i < results.length; i++)
      setValue(`entrant.exam_results.${i}.exam_year`, year)
  }, [year])

  return (
    <Subsection title="Данные о ЕГЭ" hasError={formState.errors.entrant?.exam_results}>
      {subjects.length > 0 && (
        <Controller
          control={control}
          name="entrant.exam_results"
          render={({ field: { onChange, ...field } }) => (
            <ResultsInput
              subjects={subjects}
              valueKey="exam_result"
              idKey="exam"
              onChange={(results) =>
                onChange(results.map((r) => extend({ exam_year: year }, r)))
              }
              readOnly={overview}
              {...field}
            />
          )}
        />
      )}

      <div className={clsx(styles.rowInputs, styles.yearInput)}>
        <Label title="Год сдачи*" hasError={formState.errors.entrant?.exam_year}>
          <Controller
            name="entrant.exam_year"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <NumberInput
                onValueChange={({ floatValue }) => onChange(floatValue)}
                readOnly={overview}
                hasError={formState.errors.entrant?.exam_year}
                {...field}
              />
            )}
          />
        </Label>
      </div>
    </Subsection>
  )
}

export default Results
