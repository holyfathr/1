import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import InstitutionAnalytics from "components/partials/InstitutionAnalytics"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import withProtection from "hocs/with-protection"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import styles from "./analytics.module.scss"
import Subsection from "components/ui/Subsection"

const AnalyticsPage = () => {
  const { data: analytics } = useDefinedQuery(keys.account.faculty.analytics)

  if (!analytics) return null

  return (
    <Layout title="Аналитика">
      <Page contentClassName={styles.wrapper}>
        <Subsection title="Страница в разработке" description="Данная страница находится в разработке."></Subsection>
        {/* <InstitutionAnalytics analytics={analytics} /> */}
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

export default withProtection(AnalyticsPage, "F")
