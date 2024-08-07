import { useFormContext } from "react-hook-form"

import SearchControls from "components/partials/SearchControls"

import useQueryOnce from "hooks/use-query-once"

const Controls = () => {
  const { setValue } = useFormContext()

  useQueryOnce({ faculty_city: undefined }, ({ faculty_city }) =>
    setValue("filters.faculty_city", [faculty_city])
  )

  return <SearchControls />
}

export default Controls
