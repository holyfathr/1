import toast from "react-hot-toast"
import { useEffect } from "react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import ApplicationCardContainer from "components/containers/ApplicationCardContainer"
import Layout from "components/partials/Layout"
import ApplicationsGrid from "components/ui/ApplicationsGrid"
import Page from "components/partials/Page"
import ActionButton from "components/ui/ActionButton"
import NoApplicationsIllustrationMessage from "components/partials/NoApplicationsIllustrationMessage"

import withProtection from "hocs/with-protection"

import useQueryOnce from "hooks/use-query-once"
import usePagination from "hooks/use-pagination"
import useDefinedQuery, { keys } from "hooks/use-defined-query"

import styles from "./applications.module.scss"

const ApplicationsPage = () => {
  useQueryOnce({ after_create: "true" }, () => toast.success("Заявки успешно созданы"))
  useQueryOnce({ after_delete: "true" }, () => toast.success("Заявка успешно отозвана"))

  const { page, setCount, Pagination } = usePagination()

  const { data: response, isLoading } = useDefinedQuery(
    keys.account.entrant.applications(page),
    { keepPreviousData: true }
  )

  useEffect(() => {
    setCount(response?.page_count || 0)
  }, [response, setCount])

  console.log(response)

  return (
    <Layout title="Мои заявки">
      <Page
        title="Мои заявки"
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
          <NoApplicationsIllustrationMessage />
        )}

        {Array.isArray(response?.results) && (
          <ApplicationsGrid>
            {response.results.map((application) => (
              <ApplicationCardContainer application={application} key={application.id} />
            ))}
          </ApplicationsGrid>
        )}

        <Pagination className={styles.pagination} />
      </Page>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
    },
  }
}

export default withProtection(ApplicationsPage, "E")
