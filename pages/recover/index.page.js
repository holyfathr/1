import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import RecoverFormContainer from "components/containers/RecoverFormContainer"
import Image from "next/image"

import styles from "./recover.module.scss"

const RecoverPage = () => (
  <Layout title="Восстановление пароля">
    <Page contentClassName={styles.page}>
      <Image
        src="/images/illustrations/recover.svg"
        width={500}
        height={488}
        alt=""
        priority
      />

      <Page
        title="Забыл(а) пароль?"
        className={styles.wrapper}
        contentClassName={styles.content}
      >
        <p>Введи адрес почты, указанной при регистрации, и мы отправим инструкции для восстановаления пароля.</p>
        <RecoverFormContainer />
      </Page>
    </Page>
  </Layout>
)

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "login", "header"])),
    },
  }
}

export default RecoverPage
