import Page from "components/partials/Page"
import Button from "components/ui/Button"
import FavouriteProgramsGridContainer from "./sections/FavouriteProgramsGridContainer"
import Link from "components/ui/Link"

import styles from "../../application-form.module.scss"

const Program = () => (
  <Page title="Выбери направление" contentClassName={styles.subsections}>
    <span className={styles.program}>
      <p className={styles.text}>Если ты не видишь нужной тебе образовательной программы, убедись, что ты добавил(а) её в Избранное.</p>
      <p className={styles.text}>
        Ты можешь подать заявки в 5 вузов, включая филиалы, на 5 направлений в каждом. 5 — это максимально, их может быть от 1 до 5,
        количество каждый вуз определяет самостоятельно. Всего ты можешь податься на 25 направлений. Ты сможешь изменить выбранные 
        направления до момента подачи заявки
      </p>
      <p className={styles.bold}>
        Мы обрабатываем только заявки и документы на поступление на платное обучение (на договорную основу). Если ты иностранный 
        абитуриент и собираешься поступать на бесплатное обучение (на бюджетной основу), отправь заявку на поступление на сайте{" "}
        
        <Link href="https://education-in-russia.com/" variant="accent" className={styles.link}>
          Россотрудничества
        </Link>.
      </p>
    </span>
    <FavouriteProgramsGridContainer />
    
    <div className={styles.buttons}>
      <Button variant="ghost" disabled>
          Назад
      </Button>
      <Button type="submit">Продолжить</Button>
      <Button variant="ghost" disabled>Сохранить</Button>
    </div>
  </Page>
)

export default Program
