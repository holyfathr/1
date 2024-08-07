import SearchFilters from "components/partials/SearchFilters"

import useDefinedQuery, { keys } from "hooks/use-defined-query"
import { useTranslation } from "next-i18next"

const SearchFiltersContainer = () => {
  const { t } = useTranslation("search")
  const { data: filters, isLoading } = useDefinedQuery(keys.searchFilters)

  if (isLoading) return <p>{t("filters.loading")}</p>

  return <SearchFilters filters={filters} />
}

export default SearchFiltersContainer
