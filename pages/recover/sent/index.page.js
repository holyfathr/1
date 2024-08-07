import Layout from "components/partials/Layout"
import IllustrationMessage from "components/partials/IllustrationMessage"
import Page from "components/partials/Page"

const RecoverSentPage = () => (
  <Layout title="Восстановление пароля">
    <Page>
      <IllustrationMessage
        illustration="recovery"
        title="Мы отправили тебе на email ссылку для восстановления пароля"
      >
        Чтобы задать новый пароль, перейди по ссылке, она будет действительна 24 часа
      </IllustrationMessage>
    </Page>
  </Layout>
)

export default RecoverSentPage
