import { useEffect } from "react"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import ApplicationsSummary from "components/ui/ApplicationsSummary"
import ApplicationsGrid from "components/ui/ApplicationsGrid"

import usePagination from "hooks/use-pagination"
import useFetchingIndicator from "hooks/use-fetching-indicator"
import useDefinedQuery, { keys } from "hooks/use-defined-query"

import withProtection from "hocs/with-protection"

import styles from "./applications.module.scss"

const ApplicationsPage = () => {
  const { page, setCount, Pagination } = usePagination()

  const {
    data: response,
    isLoading,
    isFetching,
  } = useDefinedQuery(keys.account.faculty.applications(page), { keepPreviousData: true })

  useEffect(() => {
    setCount(response?.page_count || 0)
  }, [response])

  useFetchingIndicator(isFetching)

  return (
    <Layout title="Заявки">
      <Page title="Заявки">
        {isLoading && <p>Загрузка...</p>}
        {!isLoading && !(response?.results.length > 0) && <p>Нет заявок.</p>}

        {Array.isArray(response?.results) && (
          <ApplicationsGrid>
            {response.results.map((summary) => (
              <ApplicationsSummary key={summary.id} summary={summary} />
            ))}
          </ApplicationsGrid>
        )}

        <Pagination className={styles.pagination} />
      </Page>
    </Layout>
  )
}

export default withProtection(ApplicationsPage, "F")
