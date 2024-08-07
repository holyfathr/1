import Page from "components/partials/Page"
import Button from "components/ui/Button"
import Personal from "./sections/Personal"
import Contacts from "./sections/Contacts"
import Documents from "./sections/Documents"
import NationalityDetails from "./sections/NationalityDetails"
import Additional from "./sections/Additional"

import styles from "../../application-form.module.scss"

const Information = ({ onPrev }) => (
  <Page title="Заполни свои личные данные" contentClassName={styles.subsections}>
    <p className={styles.text}>
      Заполни анкету на русском или английском языке. Анкеты, заполненные на других языках, не рассматриваются.
      Вся информация в этом разделе должна быть заполнена точно и достоверно.
    </p>
    <Personal />
    <Contacts />
    <NationalityDetails />
    <Documents />
    <Additional />

    <div className={styles.buttons}>
      <Button variant="ghost" onClick={onPrev}>
        Назад
      </Button>
      <Button type="submit">Продолжить</Button>
      <Button variant="ghost">
        Сохранить
      </Button>
    </div>
  </Page>
)

export default Information
