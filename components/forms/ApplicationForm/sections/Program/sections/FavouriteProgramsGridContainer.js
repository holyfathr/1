import NoFavouritesIllustrationMessage from "components/partials/NoFavouritesIllustrationMessage"
import PickableProgramsGrid from "./PickableProgramsGrid"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

const FavouriteProgramsGridContainer = () => {
  const { data: response, isLoading } = useDefinedQuery(
    keys.account.entrant.favourites(1)
  )

  if (isLoading) return <p>Загрузка избранных программ...</p>
  if (!(response?.results.length > 0)) return <NoFavouritesIllustrationMessage />

  return <PickableProgramsGrid programs={response.results} />
}

export default FavouriteProgramsGridContainer
