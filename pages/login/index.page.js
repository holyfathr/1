import LaptopIllustration from "components/illustrations/LaptopIllustration"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import SocialLoginContainer from "components/containers/SocialLoginContainer"
import LoginFormContainer from "components/containers/LoginFormContainer"
import Link from "components/ui/Link"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

import styles from "./login.module.scss"

const LoginPage = () => {
  const { t } = useTranslation("login")

  return(
    <Layout title="Вход">
      <Page contentClassName={styles.page}>
        <LaptopIllustration className={styles.illustration} />

        <Page
          title={
            <>
              {t("labelLogIn")} /{" "}
              <Link href="/register/" className={styles.link}>
                {t("labelReg")}
              </Link>
            </>
          }
          className={styles.wrapper}
          contentClassName={styles.content}
        >
          <LoginFormContainer />
          <p className={styles.recover}>
            <Link href="/recover/" variant="accent">
              {t("forgetPassword")}{" "}
            </Link>
          </p>
          <p className={styles.recover}>
            {t("signUpComment")}{" "}
            <Link href="/register/" variant="accent">
              {t("labelReg")}
            </Link>
          </p>
          <SocialLoginContainer />
        </Page>
      </Page>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "login", "header"])),
    },
  }
}

export default LoginPage
