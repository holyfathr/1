import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import merge from "lodash/merge"
import { forwardRef, useImperativeHandle } from "react"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import Toggle from "components/ui/Toggle"
import Row from "components/ui/Row"

import schema from "validation/account-form"

import styles from "./account-form.module.scss"

const AccountForm = ({ disabled, defaultValues, onSubmit, className, buttons }, ref) => {
  const { register, handleSubmit, formState, getValues } = useForm({
    defaultValues: merge({ visible: true }, defaultValues),
    resolver: zodResolver(schema),
  })

  useImperativeHandle(ref, () => ({ getValues }))

  className = clsx(styles.form, className)

  return (
    <form
      className={className}
      onSubmit={handleSubmit(onSubmit)}
      data-dirty={formState.isDirty}
    >
      <Label title="Название факультета" hasError={formState.errors.title}>
        <Input {...register("title")} readOnly={disabled}/>
      </Label>

      <Label title="Email" hasError={formState.errors.email}>
        <Input {...register("email")} readOnly={disabled}/>
      </Label>

      {disabled ? null : <Toggle {...register("visible")}>Отображать на странице сайта</Toggle>}

      {buttons && <Row>{buttons}</Row>}
    </form>
  )
}

export default forwardRef(AccountForm)
