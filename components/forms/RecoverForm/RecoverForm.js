import clsx from "clsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import Button from "components/ui/Button"

import schema from "validation/recover-form"

import styles from "./recover-form.module.scss"

const RecoverForm = ({ onSubmit, className, disabled }) => {
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
      <Label title="Email*" hasError={formState.errors.email}>
        <Input {...register("email")} type="email" />
      </Label>

      <Button className={styles.submit} type="submit" disabled={disabled}>
        Восстановить
      </Button>
    </form>
  )
}

export default RecoverForm
