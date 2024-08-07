import ActionButton from "components/ui/ActionButton"
import IllustrationMessage from "components/partials/IllustrationMessage"

import styles from "./no-favourites-illustration-message.module.scss"

const NoFavouritesIllustrationMessage = () => (
  <IllustrationMessage
    illustration="astronaut"
    title={
      <>
        Ты не подал не добавил в избранное ни
        <br />
        одной заявки. Пора это сделать :)
        <br />
        Нажми на кнопку ниже, чтобы начать
      </>
    }
    contentClassName={styles.content}
  >
    <ActionButton icon="magnifier" href="/search/" className={styles.button}>
      Начать поиск
    </ActionButton>
  </IllustrationMessage>
)

export default NoFavouritesIllustrationMessage
