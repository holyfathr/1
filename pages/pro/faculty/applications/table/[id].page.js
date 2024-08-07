import { dehydrate, QueryClient } from "react-query"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Page from "components/partials/Page"
import Layout from "components/partials/Layout"
import ApplicationsExportButtonsContainer from "components/containers/ApplicationsExportButtonsContainer"
import ApplicationsTableContainer from "components/containers/ApplicationsTableContainer"
import ApplicationsAnalyticsContainer from "components/containers/ApplicationsAnalyticsContainer"
import ApplicationsFilterContainer from "components/containers/ApplicationFilterContainer/ApplicationsFilterContainer"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import withProtection from "hocs/with-protection"

import styles from "../applications.module.scss"

const ProgramApplicationsPage = ({ id }) => {
  const { data: program } = useDefinedQuery(keys.program(id))

  return (
    <Layout title={program.title}>
      <Page title={program.title} contentClassName={styles.page}>
        <ApplicationsAnalyticsContainer programId={id} />
        <ApplicationsExportButtonsContainer programId={id} />
        <ApplicationsFilterContainer/>
        <ApplicationsTableContainer programId={id} />
      </Page>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  return { paths: [], fallback: "blocking" }
}

export const getStaticProps = async ({ params: { id }, locale }) => {
  id = Number(id)

  const queryClient = new QueryClient()

  try {
    const { name, fn } = keys.program(id)
    await queryClient.prefetchQuery(name, fn)
  } catch {
    return { notFound: true }
  }

  const translations = await serverSideTranslations(locale, ["common", "header"])

  return {
    props: {
      ...translations,
      dehydratedState: dehydrate(queryClient),
      id,
    },
  }
}

export default withProtection(ProgramApplicationsPage, "F")
