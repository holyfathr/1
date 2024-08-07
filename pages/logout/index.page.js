import { useRouter } from "next/router"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import LaptopIllustration from "components/illustrations/LaptopIllustration"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import LogoutFormContainer from "components/containers/LogoutFormContainer"
import LinkButton from "components/ui/LinkButton"

import styles from "./logout.module.scss"

const LogoutPage = () => {
  const router = useRouter()

  return (
    <Layout title="Выход">
      <Page contentClassName={styles.page}>
        <LaptopIllustration className={styles.illustration} />

        <Page
          title="Выход"
          headerClassName={styles.header}
          className={styles.wrapper}
          contentClassName={styles.content}
        >
          <p>Ты уверен, что хочешь выйти?</p>
          <LogoutFormContainer />
          <LinkButton onClick={router.back} className={styles.cancel}>
            Отмена
          </LinkButton>
        </Page>
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

export default LogoutPage
