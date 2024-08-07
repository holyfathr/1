import ActionButton from "components/ui/ActionButton"
import IllustrationMessage from "components/partials/IllustrationMessage"

import styles from "./no-applications-illustration-message.module.scss"

const NoApplicationsIllustrationMessage = () => (
  <IllustrationMessage
    illustration="letter"
    title={
      <>
        Ты не подал еще ни одной заявки.
        <br />
        Пора это сделать :)
        <br />
        Нажми на кнопку ниже, чтобы начать
      </>
    }
    contentClassName={styles.content}
  >
    <ActionButton icon="plane" href="/application/" className={styles.button}>
      Подать заявку
    </ActionButton>
  </IllustrationMessage>
)

export default NoApplicationsIllustrationMessage
