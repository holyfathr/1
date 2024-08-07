import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import UniversityProfileFormContainer from "components/containers/UniversityProfileFormContainer"

import withProtection from "hocs/with-protection"

import styles from "./university.module.scss"

const UniversityProfilePage = () => (
  <Layout title="Профиль">
    <Page title="Профиль" contentClassName={styles.wrapper}>
      <UniversityProfileFormContainer />
    </Page>
  </Layout>
)

export default withProtection(UniversityProfilePage, "U")
