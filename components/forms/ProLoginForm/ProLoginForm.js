import clsx from "clsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import PasswordInput from "components/ui/PasswordInput"
import Button from "components/ui/Button"

import schema from "validation/pro-login-form"

import styles from "./pro-login-form.module.scss"

const ProLoginForm = ({ onSubmit, className, disabled }) => {
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
      {/* TODO: username to email */}
      <Label title="E-mail" hasError={formState.errors.username}>
        <Input {...register("username")} />
      </Label>

      <Label title="Пароль" hasError={formState.errors.password}>
        <PasswordInput {...register("password")} />
      </Label>

      <Button className={styles.submit} type="submit" disabled={disabled}>
        Войти
      </Button>
    </form>
  )
}

export default ProLoginForm
