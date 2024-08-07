import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"

import Label from "components/ui/Label"
import PasswordInput from "components/ui/PasswordInput"
import Button from "components/ui/Button"

import schema from "validation/recover-set-password-form"

import styles from "./recover-set-password-form.module.scss"

const RecoverSetPasswordForm = ({ onSubmit, className, disabled }) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  })

  className = clsx(styles.form, className)

  return (
    <form
      className={className}
      onSubmit={handleSubmit(onSubmit)}
      data-dirty={formState.isDirty}
    >
      <Label title="Придумай новый пароль" hasError={formState.errors.password}>
        <PasswordInput {...register("password")} />
      </Label>

      <Label title="Подтверди новый пароль" hasError={formState.errors.password_confirm}>
        <PasswordInput {...register("password_confirm")} />
      </Label>

      <Button className={styles.submit} type="submit" disabled={disabled}>
        Сохранить
      </Button>
    </form>
  )
}

export default RecoverSetPasswordForm
