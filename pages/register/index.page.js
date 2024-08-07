import LaptopIllustration from "components/illustrations/LaptopIllustration"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import SocialLoginContainer from "components/containers/SocialLoginContainer"
import Link from "components/ui/Link"
import RegisterFormContainer from "components/containers/RegisterFormContainer"

import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import styles from "./register.module.scss"

const RegisterPage = () => {
  const {t} = useTranslation("login")

  return(
    <Layout title="Регистрация">
      <Page contentClassName={styles.page}>
        <LaptopIllustration className={styles.illustration} />
  
        <Page
          title={
            <>
              <Link href="/login/" className={styles.link}>
                {t("labelLogIn")}
              </Link>{" "}
              / {t("labelReg")}
            </>
          }
          className={styles.wrapper}
          contentClassName={styles.content}
        >
          <RegisterFormContainer />
          <div className={styles.exist}>
            <p className={styles.checkbox}>
              {t("already")}{" "}
              <Link href="/login/" variant="accent">
                {t("labelLogIn")}
              </Link>
            </p>   
          </div>
          <SocialLoginContainer className={styles.social} />
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

export default RegisterPage
