import { useFormContext } from "react-hook-form"

import Subsection from "components/ui/Subsection"
import InputsCloud from "components/ui/InputsCloud"
import IntegerInput from "components/ui/IntegerInput"

const Grades = ({ overview }) => {
  const { register, formState } = useFormContext()

  return (
    <Subsection title="Количество оценок в документе об образовании">
      <InputsCloud>
        <IntegerInput
          title="Количество «3»"
          hasError={formState.errors.entrant?.education_document_grades_number?.threes}
          min={0}
          readOnly={overview}
          {...register("entrant.education_document_grades_number.threes", {
            valueAsNumber: true,
          })}
        />

        <IntegerInput
          title="Количество «4»"
          hasError={formState.errors.entrant?.education_document_grades_number?.fours}
          min={0}
          readOnly={overview}
          {...register("entrant.education_document_grades_number.fours", {
            valueAsNumber: true,
          })}
        />

        <IntegerInput
          title="Количество «5»"
          hasError={formState.errors.entrant?.education_document_grades_number?.fives}
          min={0}
          readOnly={overview}
          {...register("entrant.education_document_grades_number.fives", {
            valueAsNumber: true,
          })}
        />
      </InputsCloud>
    </Subsection>
  )
}

export default Grades
