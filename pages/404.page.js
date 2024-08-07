import Layout from "components/partials/Layout"
import Button from "components/ui/Button"
import IllustrationMessage from "components/partials/IllustrationMessage"
import Page from "components/partials/Page"

const NotFoundPage = () => (
  <Layout title="404">
    <Page>
      <IllustrationMessage illustration="404" title="Страница не найдена">
        <Button href="/">Перейти на главную</Button>
      </IllustrationMessage>
    </Page>
  </Layout>
)

export default NotFoundPage
