import PickableProgramsGrid from "./PickableProgramsGrid"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

const RecommendedProgramsGridContainer = () => {
  const { data: recommendations = [], isLoading } = useDefinedQuery(
    keys.account.entrant.recommendations
  )

  if (isLoading) return <p>Загрузка рекомендаций...</p>

  if (recommendations.length === 0)
    return <p>К сожалению, не удалось найти актуальные рекомендации</p>

  return <PickableProgramsGrid programs={recommendations} />
}

export default RecommendedProgramsGridContainer
