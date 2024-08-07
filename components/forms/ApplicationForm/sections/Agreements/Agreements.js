import Page from "components/partials/Page"
import Button from "components/ui/Button"
import Checkboxes from "./sections/Checkboxes"
import Checkbox from "components/ui/Checkbox"

import { useFormContext } from "react-hook-form"

import styles from "../../application-form.module.scss"

const Agreements = ({ onPrev, overview }) => {

  const { register, formState } = useFormContext()

  return(
    <Page
      title="Предоставь согласия, необходимые для обработки заявки"
      contentClassName={styles.subsections}
    >
      {/* <Checkboxes /> */}
      <ul className={styles.list}>
        <li>Я ознакомлен(а) с правилами пользования сервисом и политикой конфиденциальности</li>
        <li>Я согласен(на) на передачу моих данных выбранным учебным заведениям для обработки</li>
        <li>Я подтверждаю, что информация, указанная в заявке, является точной, полной и достоверной</li>
        <li>
          Я подтверждаю, что подам заявки не более чем в 5 вузов, включая филиалы, и на не более чем 5 направлений
          в каждом через любые возможные каналы приема
        </li>
      </ul>

      <Checkbox
          {...register("agreements")}
          readOnly={overview}
          hasError={formState.errors.agreements}
        >
          Я согласен(на) со всем вышеуказанным.
        </Checkbox>

      <div className={styles.buttons}>
        <Button variant="ghost" onClick={onPrev}>
          Назад
        </Button>
        <Button type="submit">Продолжить</Button>
      </div>
    </Page>
  )
}
export default Agreements
