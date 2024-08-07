import { useFormContext, useWatch } from "react-hook-form"
import xorBy from "lodash/xorBy"

import Subject from "components/ui/Subject"
import Subsection from "components/ui/Subsection"
import InputsCloud from "components/ui/InputsCloud"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

const ExamSubjects = () => {
  const { control, setValue } = useFormContext()
  const pickedSubjects = useWatch({ name: "subjects", control })

  const { data: subjects = [] } = useDefinedQuery(keys.subjects)

  const isSelected = (subject) => {
    return !!pickedSubjects.find((s) => s.id === subject.id)
  }

  const onChange = (subject) => {
    const newPickedSubjects = xorBy(pickedSubjects, [subject], "id")
    setValue("subjects", newPickedSubjects)
  }

  return (
    <Subsection title="Выбери предметы ЕГЭ">
      <InputsCloud>
        {subjects.map((subject) => (
          <Subject
            key={subject.id}
            onChange={() => onChange(subject)}
            checked={isSelected(subject)}
          >
            {subject.exam_title}
          </Subject>
        ))}
      </InputsCloud>
    </Subsection>
  )
}

export default ExamSubjects
