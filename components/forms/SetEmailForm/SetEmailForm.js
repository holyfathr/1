import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"

import Label from "components/ui/Label"
import Input from "components/ui/Input"
import Button from "components/ui/Button"

import schema from "validation/set-email-form"

import styles from "./set-email-form.module.scss"

const SetEmailForm = ({ onSubmit, className, disabled }) => {
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
      <Label title="Введи свой E-mail" hasError={formState.errors.email}>
        <Input {...register("email")} type="email" />
      </Label>

      <Button className={styles.submit} type="submit" disabled={disabled}>
        Продолжить
      </Button>
    </form>
  )
}

export default SetEmailForm
