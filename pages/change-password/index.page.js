import ChangePasswordContainer from "components/containers/ChangePasswordContainer"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"

const ChangePasswordPage = () => {
  return(
    <Layout title="Настройки пароля">
      <Page>
        <ChangePasswordContainer />
      </Page>
    </Layout>
  )
}

export default ChangePasswordPage