import Page from "components/partials/Page"
import Button from "components/ui/Button"
import List from "./sections/List"

import styles from "../../application-form.module.scss"

const Priorities = ({ onPrev }) => (
  <Page title="Расставь приоритеты" contentClassName={styles.subsections}>
    <p className={styles.text}>
      Это поможет нам отсортировать список заявок в твоём личном кабинете и оптимизировать 
      уведомления в соответствии с твоими приоритетами. Просто перетащи карточки.
    </p>

    <List />

    <div className={styles.buttons}>
      <Button variant="ghost" onClick={onPrev}>
        Назад
      </Button>
      <Button type="submit">Продолжить</Button>
      <Button variant="ghost" disabled>Сохранить</Button>
    </div>
  </Page>
)

export default Priorities
