import { useFormContext } from "react-hook-form"
import get from "lodash/get"

import Checkbox from "components/ui/Checkbox"

import styles from "../agreements.module.scss"

const Checkboxes = ({ overview }) => {
  const { register, formState } = useFormContext()

  return (
    <div className={styles.checkboxes}>
      <Checkbox
        {...register("agreements.0")}
        readOnly={overview}
        hasError={get(formState.errors, "agreements[0]")}
      >
        Я подтверждаю, что заявление о приёме заполнено мной лично
      </Checkbox>

      <Checkbox
        {...register("agreements.1")}
        readOnly={overview}
        hasError={get(formState.errors, "agreements[1]")}
      >
        Я подтверждаю, что все предоставленные сведения являются подлинными и достоверными
      </Checkbox>

      <Checkbox
        {...register("agreements.2")}
        readOnly={overview}
        hasError={get(formState.errors, "agreements[2]")}
      >
        Я согласен с политикой хранения и обработки персональных данных Almater
      </Checkbox>

      <Checkbox
        {...register("agreements.3")}
        readOnly={overview}
        hasError={get(formState.errors, "agreements[3]")}
      >
        Я подтверждаю, что отправляю заявление о приёме не более чем в 5 вузов по 10
        направлений в каждом
      </Checkbox>

      <Checkbox
        {...register("agreements.4")}
        readOnly={overview}
        hasError={get(formState.errors, "agreements[4]")}
      >
        Я согласен на обработку заявки вузами
      </Checkbox>
    </div>
  )
}

export default Checkboxes
