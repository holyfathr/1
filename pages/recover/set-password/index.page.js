import Image from "next/image"

import RecoverSetPasswordFormContainer from "components/containers/RecoverSetPasswordFormContainer"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"

import styles from "../recover.module.scss"

const RecoverSetPasswordPage = () => (
  <Layout title="Восстановление пароля">
    <Page contentClassName={styles.page}>
      <Image
        src="/images/illustrations/key.svg"
        width={500}
        height={488}
        alt=""
        priority
      />

      <Page
        title="Задай новый пароль"
        className={styles.wrapper}
        contentClassName={styles.content}
      >
        <RecoverSetPasswordFormContainer />
      </Page>
    </Page>
  </Layout>
)

export default RecoverSetPasswordPage
