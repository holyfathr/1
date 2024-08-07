import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

import ProfileFormContainer from "components/containers/ProfileFormContainer"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"

import withProtection from "hocs/with-protection"

const ProfilePage = () => {
  const { t } = useTranslation("entr-profile")
  
  return(
    <Layout title={t("profile")}>
      <Page>
        <ProfileFormContainer />
      </Page>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "header", "entr-profile"])),
    },
  }
}

export default withProtection(ProfilePage, "E")
