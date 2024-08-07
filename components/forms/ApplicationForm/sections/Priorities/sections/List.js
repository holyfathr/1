import { useFormContext, useWatch } from "react-hook-form"

import PrioritiesList from "components/ui/PrioritiesList"
import ProgramOverviewCard from "components/ui/ProgramOverviewCard"

const List = ({ overview }) => {
  const { control, setValue } = useFormContext()
  const programs = useWatch({ control, name: "programs" })

  const onChange = (programs) => setValue("programs", programs)

  return (
    <PrioritiesList
      programs={programs}
      onChange={onChange}
      disabled={overview}
      renderCard={(program) => <ProgramOverviewCard program={program} />}
    />
  )
}

export default List
