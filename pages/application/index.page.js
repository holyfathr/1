import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import ApplicationFormContainer from "components/containers/ApplicationFormContainer"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"

import withProtection from "hocs/with-protection"

const ApplicationPage = () => (
  <Layout title="Заявка">
    <Page>
      <ApplicationFormContainer />
    </Page>
  </Layout>
)

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header", "stat-card", "index.page" ])),
    },
  }
}

export default withProtection(ApplicationPage, "E")
