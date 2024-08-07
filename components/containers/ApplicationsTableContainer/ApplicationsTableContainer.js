import ApplicationsTable from "components/partials/ApplicationsTable"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

const ApplicationsTableContainer = ({ programId }) => {
  const { data: program } = useDefinedQuery(keys.program(programId))
  const { data: table } = useDefinedQuery(keys.program(programId).applications.table)

  console.log(table)

  if (!program) return "Загрузка..."

  return <ApplicationsTable program={program} applications={table} />
}

export default ApplicationsTableContainer
