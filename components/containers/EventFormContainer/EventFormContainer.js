import EventForm from "components/forms/EventForm"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

const EventFormContainer = (props) => {
  const { data: programs } = useDefinedQuery(keys.account.faculty.programs)

  if (!programs) return "Загрузка..."

  return <EventForm programs={programs} {...props} />
}

export default EventFormContainer
