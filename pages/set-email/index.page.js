import SetEmailFormContainer from "components/containers/SetEmailFormContainer"
import LaptopIllustration from "components/illustrations/LaptopIllustration"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"

import styles from "./set-email.module.scss"

const SetEmailPage = () => (
  <Layout title="Требуется почта">
    <Page contentClassName={styles.page}>
      <LaptopIllustration />

      <Page
        title="Введи свой email"
        className={styles.wrapper}
        contentClassName={styles.content}
      >
        <p>Чтобы оставаться с нами на связи</p>
        <SetEmailFormContainer />
      </Page>
    </Page>
  </Layout>
)

export default SetEmailPage
