import { dehydrate, QueryClient } from "react-query"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import Header from "./sections/Header"
import Stats from "./sections/Stats"
import Features from "./sections/Features"
import Actions from "./sections/Actions"
import Description from "./sections/Description"
import Events from "./sections/Events"
import QualifyTest from "./sections/QualifyTest"
import Links from "./sections/Links"
import Breadcrumbs from "./sections/Breadcrumbs"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import styles from "./programs.module.scss"

const ProgramPage = ({ id }) => {
  const { data: program } = useDefinedQuery(keys.program(id))

  console.log(program)

  return (
    <Layout title={program.title}>
      <Page contentClassName={styles.page} as="main">
        <Breadcrumbs program={program} underline/>
        <Header program={program} />
        <Stats program={program} />
        <QualifyTest program={program} />
        <Actions program={program} />
        <Description program={program} />
        <Events program={program} />
        <Links program={program} />
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
    const { name, fn } = keys.program(id)
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

export default ProgramPage
