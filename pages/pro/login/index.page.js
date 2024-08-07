import { useMediaQuery } from "react-responsive"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import LibraryIllustration from "components/illustrations/LibraryIllustration"
import ProLoginFormContainer from "components/containers/ProLoginFormContainer"
import ProDisabledIllustrationMessage from "components/partials/ProDisabledIllustrationMessage"

import styles from "./login.module.scss"

const ProLoginPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 750 })

  return (
    <Layout title="Вход">
      {isDesktop ? (
        <Page contentClassName={styles.page}>
          <LibraryIllustration />

          <Page title="Вход" className={styles.wrapper} contentClassName={styles.content}>
            <ProLoginFormContainer />
          </Page>
        </Page>
      ) : (
        <Page>
          <ProDisabledIllustrationMessage />
        </Page>
      )}
    </Layout>
  )
}

export default ProLoginPage
