import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import UniversitiesControlContainer from "components/containers/UniversitiesControlContainer"

import withProtection from "hocs/with-protection"

const AdminProfilePage = () => (
  <Layout title="Профиль">
    <Page>
      <UniversitiesControlContainer />
    </Page>
  </Layout>
)

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header"])),
    },
  }
}

export default withProtection(AdminProfilePage, "A")
