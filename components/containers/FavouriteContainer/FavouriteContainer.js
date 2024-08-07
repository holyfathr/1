import { useMutation, useQueryClient } from "react-query"
import { useMemo } from "react"

import StarButton from "components/ui/StarButton"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import { addEntrantFavourite, deleteEntrantFavourite } from "api/entrant"

const FavouriteContainer = ({ program, ...props }) => {
  const queryClient = useQueryClient()

  const { data: account } = useDefinedQuery(keys.account)
  const { data: favourites = [], isFetching } = useDefinedQuery(
    keys.account.entrant.favourites()
  )

  const favouriteMutation = useMutation(addEntrantFavourite)
  const unfavouriteMutation = useMutation(deleteEntrantFavourite)

  const favourite = useMemo(() => {
    return favourites.find((f) => f.educational_program === program.id)
  }, [favourites, program])

  const updateFavouritesQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey.includes("favourite"),
    })
  }

  const onFavourite = async () => {
    try {
      await favouriteMutation.mutateAsync({ id: program.id })
      await updateFavouritesQueries()
    } catch {}
  }

  const onUnfavourite = async () => {
    try {
      await unfavouriteMutation.mutateAsync({ id: favourite.id })
      await updateFavouritesQueries()
    } catch {}
  }

  if (account?.role !== "E") return null

  return (
    <StarButton
      onClick={favourite ? onUnfavourite : onFavourite}
      active={favourite}
      disabled={
        favouriteMutation.isLoading || unfavouriteMutation.isLoading || isFetching
      }
      {...props}
    />
  )
}

export default FavouriteContainer
