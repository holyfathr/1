import { useFormContext, useWatch } from "react-hook-form"
import unionBy from "lodash/unionBy"

import ProgramsGrid from "components/partials/ProgramsGrid"
import ProgramSummaryCardPickable from "components/partials/ProgramSummaryCardPickable"

const PickableProgramsGrid = ({ programs }) => {
  const { control, setValue } = useFormContext()
  const selectedPrograms = useWatch({ control, name: "programs" })

  const findSelected = ({ id }) => {
    return selectedPrograms.find((p) => p.id === id)
  }

  const onSelect = (program) => {
    const newSelectedPrograms = unionBy(selectedPrograms, [program], "id")
    setValue("programs", newSelectedPrograms)
  }

  const onDeselect = ({ id }) => {
    const newSelectedPrograms = selectedPrograms.filter((p) => p.id !== id)
    setValue("programs", newSelectedPrograms)
  }

  return (
    <ProgramsGrid>
      {programs.map((program) => (
        <ProgramSummaryCardPickable
          program={findSelected(program) || program}
          key={program.id}
          onSelect={onSelect}
          onDeselect={onDeselect}
        />
      ))}
    </ProgramsGrid>
  )
}

export default PickableProgramsGrid
