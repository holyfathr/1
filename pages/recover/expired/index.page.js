import Layout from "components/partials/Layout"
import IllustrationMessage from "components/partials/IllustrationMessage"
import Page from "components/partials/Page"
import Button from "components/ui/Button"

const RecoverExpiredPage = () => (
  <Layout title="Восстановление пароля">
    <Page>
      <IllustrationMessage illustration="plane" title="Срок подтверждения истёк :(">
        <p>Нажми на кнопку, чтобы получить новую ссылку</p>
        <br />
        <Button href="/recover/">Оправить письмо</Button>
      </IllustrationMessage>
    </Page>
  </Layout>
)

export default RecoverExpiredPage
