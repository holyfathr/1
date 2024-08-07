import clsx from "clsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "next-i18next"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import PasswordInput from "components/ui/PasswordInput"
import Button from "components/ui/Button"

import schema from "validation/login-form"

import styles from "./login-form.module.scss"

const LoginForm = ({ onSubmit, className, disabled }) => {
  const { t } = useTranslation("login")
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
      <Label title={t("emailTitle")} hasError={formState.errors.email}>
        <Input {...register("email")} type="email" />
      </Label>

      <Label title={t("passwordTitle")} hasError={formState.errors.password}>
        <PasswordInput {...register("password")} />
      </Label>

      <Button className={styles.submit} type="submit" disabled={disabled}>
        {t("logInButton")}
      </Button>
    </form>
  )
}

export default LoginForm
