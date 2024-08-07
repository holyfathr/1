import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"
import Subsection from "components/ui/Subsection"
import FileUploadContainer from "components/containers/FileUploadContainer"
import TextArea from "components/ui/TextArea"
import Button from "components/ui/Button"
import { useState } from "react"

import styles from "./visa-invitation-form.module.scss"
import Label from "components/ui/Label"

const VisaInvitationForm = ({ onNext }) => {
  const [isFormVisible, setIsFormVisible] = useState(true)
  const methods = useForm({
    defaultValues: {
      visa_invitation: null,
      comments: "",
    },
  })

  const onSubmit = (data) => {
    console.log("Form Data: ", data)
  }

  const hideForm = () => {
    setIsFormVisible(false)
  }

  return (
    <>
      {isFormVisible && (
        <Subsection title="Визовое приглашение">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onNext)} className={styles.wrapper}>
              <div className={styles.form}>
                <Controller
                  name="visa_invitation"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <FileUploadContainer
                        title="Копия визового приглашения"
                        description="(PDF)"
                        accept="application/pdf"
                        variant="tiny"
                        className={styles.file}
                        {...field}
                      />
                      {error && <p className="error">{error.message}</p>}
                    </>
                  )}
                  rules={{ required: "Пожалуйста, загрузите копию визового приглашения" }}
                />
                <Controller
                  name="comments"
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <Label
                      title="Комментарий к прикреплению (опционально)"
                      className={styles.textArea}
                    >
                      <textarea className={styles.textarea} {...field}></textarea>
                      {error && <p className="error">{error.message}</p>}
                    </Label>
                  )}
                  rules={{
                    maxLength: {
                      value: 500,
                      message: "Комментарий не должен превышать 500 символов",
                    },
                  }}
                />
              </div>
              <div className={styles.buttons}>
                <Button type="submit">Загрузить приглашение</Button>

                <Button variant="ghost" onClick={hideForm}>
                  Приглашение не требуется
                </Button>
              </div>
            </form>
          </FormProvider>
        </Subsection>
      )}
    </>
  )
}

export default VisaInvitationForm
