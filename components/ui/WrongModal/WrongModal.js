import Image from "next/image"
import Subsection from "../Subsection"
import Button from "../Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import schema from "validation/account-form"
import errorHandler from "helpers/error-handler"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"

import styles from "./wrong-modal.module.scss"
import Input from "components/ui/Input"
import Label from "components/ui/Label"
import { putUniversityComment, putApplicationFac } from "api/account"

const WrongModal = ({ application, closeModal }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      university_comment: "",
    },
    resolver: zodResolver(schema),
  })

  const queryClient = useQueryClient()
  const putUniversityMutation = useMutation(putUniversityComment, {
    onError: errorHandler,
  })
  const putMutation = useMutation(putApplicationFac, {
    onError: errorHandler,
  })

  const updateApplicationsQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey.includes("application"),
    })
  }

  const onComment = async (formData) => {
    const alert = toast.loading("Передача комментария...")

    try {
      await putUniversityMutation.mutateAsync({
        id: application.id,
        university_comment: formData.university_comment,
        educational_program_id: application.educational_program_obj.id,
      })
      await putMutation.mutateAsync({
        id: application.id,
        university_status: "I",
      })
      await updateApplicationsQueries()

      toast.success("Комментарий передан", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

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
        <span>
          Если заявка содержит ошибку или неполные данные, введите подробное описание
          ошибки или недостающей информации. Мы получим ваш комментарий и свяжемся с
          абитуриентом для устранения недостатков.
        </span>
        <Label title="Опишите проблему" hasError={formState.errors.university_comment}>
          <Input {...register("university_comment")} />
        </Label>
      </Subsection>
      <div className={styles.buttons}>
        <Controls
          styles={styles}
          closeModal={closeModal}
          onDelete={handleSubmit(onComment)} 
        />
      </div>
    </div>
  )
}

const Controls = ({ styles, closeModal, onDelete }) => (
  <>
    <Button variant="ghost" onClick={closeModal}>
      Отменить
    </Button>

    <Button
      className={styles.rejectButton}
      onClick={async () => {
        await onDelete()
        closeModal()
      }}
    >
      Отправить комментарий
    </Button>
  </>
)

export default WrongModal
