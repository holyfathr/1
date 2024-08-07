import ApplicationsAnalytics from "components/partials/ApplicationsAnalytics"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

const ApplicationsAnalyticsContainer = ({ programId }) => {
  const { data: applications } = useDefinedQuery(keys.program(programId).applications)

  if (!applications) return null

  return <ApplicationsAnalytics analytics={applications} />
}

export default ApplicationsAnalyticsContainer
