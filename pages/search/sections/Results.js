import { useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { useDebounce } from "use-debounce"
import { useTranslation } from "next-i18next"

import ProgramsGrid from "components/partials/ProgramsGrid"
import ProgramCard from "components/ui/ProgramCard"

import useDefinedQuery, { keys } from "hooks/use-defined-query"
import useFetchingIndicator from "hooks/use-fetching-indicator"
import usePagination from "hooks/use-pagination"

const Results = () => {
  const { t: tC } = useTranslation("common")
  const { control } = useFormContext()

  const _search = useWatch({ control, name: "search" })
  const [search] = useDebounce(_search, 500, { trailing: true })

  const _filters = useWatch({ control, name: "filters" })
  const [filters] = useDebounce(_filters, 500, { trailing: true })

  const { page, setCount, Pagination, setPage } = usePagination()

  const {
    data: response,
    isLoading,
    isFetching,
  } = useDefinedQuery(keys.programs({ search, filters, page }), {
    keepPreviousData: true,
  })

  useFetchingIndicator(isFetching)

  useEffect(() => {
    setPage(1)
    setCount(response?.page_count || 0)
  }, [response?.page_count, setCount, setPage])

  if (isLoading) return <p>{tC("loadingText")}</p>
  if (!(response?.results.length > 0)) return <p>{tC("nothingFound")}</p>

  return (
    <>
      <ProgramsGrid>
        {response.results.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </ProgramsGrid>

      <Pagination />
    </>
  )
}

export default Results
