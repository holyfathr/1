import { dehydrate, QueryClient } from "react-query"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import FacultyHeader from "components/partials/FacultyHeader"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import Breadcrumbs from "./sections/Breadcrumbs"
import Description from "./sections/Description"
import Programs from "./sections/Programs"
import Contacts from "./sections/Contacts"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import styles from "./faculties.module.scss"

const FacultyPage = ({ id }) => {
  const { data: faculty } = useDefinedQuery(keys.faculty(id))

  return (
    <Layout title={faculty.title}>
      <Page contentClassName={styles.page}>
        <Breadcrumbs faculty={faculty}/>
        <FacultyHeader faculty={faculty} />
        <Description faculty={faculty} />
        <Programs faculty={faculty} />
        <Contacts faculty={faculty} />
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
    const { name, fn } = keys.faculty(id)
    await queryClient.prefetchQuery(name, fn)
  } catch {
    return { notFound: true }
  }

  const translations = await serverSideTranslations(locale, ["common", "header", "stat-card"])

  return {
    props: {
      ...translations,
      dehydratedState: dehydrate(queryClient),
      id,
    },
  }
}

export default FacultyPage
