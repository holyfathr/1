import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import Layout from "components/partials/Layout"
import IllustrationMessage from "components/partials/IllustrationMessage"
import Page from "components/partials/Page"
import Button from "components/ui/Button"

const ForbiddenPage = () => (
  <Layout title="Доступ запрещен">
    <Page>
      <IllustrationMessage
        title="Авторизируйся, чтобы посмотреть более подробную информацию"
        illustration="sign-up"
      >
        <Button href="/login/">Авторизоваться</Button>
      </IllustrationMessage>
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

export default ForbiddenPage
