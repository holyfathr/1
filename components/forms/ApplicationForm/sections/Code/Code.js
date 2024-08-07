import { useEffect, useState } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import toast from "react-hot-toast"
import { useMutation } from "react-query"

import Page from "components/partials/Page"
import Button from "components/ui/Button"
import CodeInput from "components/ui/CodeInput"
import Countdown from "components/proxies/Countdown"
import LinkButton from "components/ui/LinkButton"

import errorHandler from "helpers/error-handler"

import { sendPhoneCode, verifyPhone } from "api/auth"

import styles from "../../application-form.module.scss"

const Code = ({ onNext, onPrev }) => {
  const { control } = useFormContext()
  const phone = useWatch({ control, name: "entrant.phone_number" })
  const code = useWatch({ control, name: "code" })

  const [nextAttemptDate, setNextAttemptDate] = useState(Date.now() + 60 * 1000)

  const sendMutation = useMutation(sendPhoneCode, { onError: errorHandler })
  const verifyMutation = useMutation(verifyPhone, { onError: errorHandler })

  const onResend = async () => {
    const alert = toast.loading("Отправка сообщения...")

    try {
      await sendMutation.mutateAsync()
      setNextAttemptDate(Date.now() + 60 * 1000)

      toast.success("Сообщение успешно отправлено", { id: alert })
      return true
    } catch {
      toast.dismiss(alert)
      return false
    }
  }

  const preNext = async () => {
    const alert = toast.loading("Проверка кода...")

    try {
      await verifyMutation.mutateAsync({ code })
      onNext()
    } catch {
      toast.dismiss(alert)
    }
  }

  useEffect(() => {
    sendMutation.mutate()
  }, [])

  return (
    <Page contentClassName={styles.subsections}>
      <h1 className={styles.codeTitle}>
        Введи код из SMS сообщения, отправленного на номер {phone}
      </h1>

      <Controller
        name="code"
        control={control}
        render={({ field }) => <CodeInput className={styles.code} {...field} />}
      />

      <div className={styles.verticalButtons}>
        <Button onClick={preNext}>Продолжить</Button>
        <Button variant="ghost" onClick={onPrev}>
          Назад
        </Button>

        <Countdown date={nextAttemptDate}>
          {({ completed, remaining }) => (
            <LinkButton onClick={onResend} disabled={!completed} variant="accent">
              Отправить код повторно {!completed && `(${remaining})`}
            </LinkButton>
          )}
        </Countdown>
      </div>
    </Page>
  )
}

export default Code
