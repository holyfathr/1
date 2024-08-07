import { useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import ProgramsGrid from "components/partials/ProgramsGrid"
import ProgramCard from "components/ui/ProgramCard"
import ActionButton from "components/ui/ActionButton"
import NoFavouritesIllustrationMessage from "components/partials/NoFavouritesIllustrationMessage"

import usePagination from "hooks/use-pagination"
import useFetchingIndicator from "hooks/use-fetching-indicator"
import useDefinedQuery, { keys } from "hooks/use-defined-query"

import withProtection from "hocs/with-protection"

import styles from "./favourites.module.scss"

const FavouritesPage = () => {
  const { page, setCount, Pagination } = usePagination()

  const {
    data: response,
    isLoading,
    isFetching,
  } = useDefinedQuery(keys.account.entrant.favourites(page), { keepPreviousData: true })

  useEffect(() => {
    setCount(response?.page_count || 0)
  }, [response])

  useFetchingIndicator(isFetching)

  return (
    <Layout title="Избранное">
      <Page
        title="Избранное"
        controls={
          <ActionButton
            href="/application/"
            icon="plane"
            style={{ visibility: response?.results.length > 0 ? "visible" : "hidden" }}
          >
            Подать заявку
          </ActionButton>
        }
      >
        {isLoading && <p>Загрузка...</p>}
        {!isLoading && !(response?.results.length > 0) && (
          <NoFavouritesIllustrationMessage />
        )}

        {Array.isArray(response?.results) && (
          <ProgramsGrid>
            {response.results.map((program) => (
              <ProgramCard program={program} key={program.id} />
            ))}
          </ProgramsGrid>
        )}

        <Pagination className={styles.pagination} />
      </Page>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index.page", "stat-card"])),
    },
  }
}

export default withProtection(FavouritesPage, "E")
