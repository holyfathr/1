import { dehydrate, QueryClient } from "react-query"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import UniversityHeader from "components/partials/UniversityHeader"
import Description from "./sections/Description"
import Faculties from "./sections/Faculties"
import Contacts from "./sections/Contacts"
import Gallery from "./sections/Gallery"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import styles from "./universities.module.scss"

const UniversityPage = ({ id }) => {
  const { data: university } = useDefinedQuery(keys.university(id))

  return (
    <Layout title={university.title} flatHeader>
      <Page className={styles.page} contentClassName={styles.wrapper}>
        <UniversityHeader university={university} />
        <Description university={university} />
        <Faculties university={university} />
        <Gallery university={university}/>
        <Contacts university={university} />
      </Page>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  return { paths: [], fallback: "blocking" }
}

export const getStaticProps = async ({ params: { id } }) => {
  id = Number(id)

  const queryClient = new QueryClient()

  try {
    const { name, fn } = keys.university(id)
    await queryClient.prefetchQuery(name, fn)
  } catch {
    return { notFound: true }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  }
}

export default UniversityPage
