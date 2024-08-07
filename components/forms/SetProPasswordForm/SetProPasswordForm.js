import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"

import Label from "components/ui/Label"
import PasswordInput from "components/ui/PasswordInput"
import Button from "components/ui/Button"

import schema from "validation/set-pro-password-form"

import styles from "./set-pro-password-form.module.scss"

const SetProPasswordForm = ({ onSubmit, className, disabled }) => {
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
      <Label title="Старый пароль*" hasError={formState.errors.previous_password}>
        <PasswordInput {...register("previous_password")} />
      </Label>

      <Label title="Новый пароль*" hasError={formState.errors.password}>
        <PasswordInput {...register("password")} />
      </Label>

      <Label title="Подтвердите пароль" hasError={formState.errors.password_confirm}>
        <PasswordInput {...register("password_confirm")} />
      </Label>

      <Button className={styles.submit} type="submit" disabled={disabled}>
        Сохранить
      </Button>
    </form>
  )
}

export default SetProPasswordForm
