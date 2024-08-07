import Image from "next/image"
import Subsection from "../Subsection"
import Button from "../Button"
import { useForm } from "react-hook-form"
import merge from "lodash/merge"
import { zodResolver } from "@hookform/resolvers/zod"
import schema from "validation/account-form"

import styles from "./wrong-modal.module.scss"
import Input from "components/ui/Input"
import Label from "components/ui/Label"

const WrongModal = ({ application, onDelete, closeModal }) => {
  const { register, formState } = useForm({
    defaultValues: merge({ visible: true }),
    resolver: zodResolver(schema),
  })
  return (
    <div className={styles.wrapper}>
      <Image
        src="/images/illustrations/wrong-modal.svg"
        width={391}
        height={391}
        alt=""
        priority
      />
      <Subsection title="Что-то не так с заявкой?" className={styles.message}>
        {/* <div className={styles.education}>
          <p><b>Название вуза: {" "}</b>{application.university_obj.title}</p>
          <p><b>Название программы: {" "}</b>{application.educational_program_obj.title}</p>
        </div> */}
        <span>
          Если заявка содержит ошибку или неполные данные, введите подробное описание
          ошибки или недостающей информации. Мы получим ваш комментарий и свяжемся с
          абитуриентом для устранения недостатков.
        </span>
        <Label title="Опишите проблему" hasError={formState.errors.title}>
          <Input {...register("title")} />
        </Label>
      </Subsection>
      <div className={styles.buttons}>
        <Controls styles={styles} closeModal={closeModal} onDelete={onDelete} />
      </div>
    </div>
  )
}

const Controls = ({ styles, closeModal, onDelete }) => (
  <>
    <Button tton variant="ghost" onClick={closeModal}>
      Отменить
    </Button>

    <Button
      className={styles.rejectButton}
      onClick={() => {
        onDelete()
        closeModal
      }}
    >
      Отправить комментарий
    </Button>
  </>
)

export default WrongModal
