import FacultyProfileFormContainer from "components/containers/FacultyProfileFormContainer"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"

import withProtection from "hocs/with-protection"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import styles from "./profile.module.scss"

const FacultyProfilePage = () => (
  <Layout title="Профиль">
    <Page title="Профиль" contentClassName={styles.wrapper}>
      <FacultyProfileFormContainer />
    </Page>
  </Layout>
)

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index.page", "stat-card"])),
    },
  }
}

export default withProtection(FacultyProfilePage, "F")
