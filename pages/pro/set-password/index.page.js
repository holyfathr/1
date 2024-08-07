import SetProPasswordFormContainer from "components/containers/SetProPasswordFormContainer"
import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import Image from "next/image"

import styles from "./set-password.module.scss"

const SetPasswordPage = () => (
  <Layout title="Изменение пароля при первичном входе">
    <Page contentClassName={styles.page}>
    <Image
        src="/images/illustrations/reset-pro.svg"
        width={573}
        height={573}
        alt=""
        priority
      />

      <Page
        title="Создайте новый пароль"
        controls={
          "В целях безопасности Вам необходимо сменить пароль, который мы Вам отправили, на ваш собственный пароль."
        }
        className={styles.wrapper}
        contentClassName={styles.content}
        controlsClassName={styles.description}
        headerClassName={styles.controls}
      >
        <SetProPasswordFormContainer />
      </Page>
    </Page>
  </Layout>
)

export default SetPasswordPage
