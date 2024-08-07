import Subsection from "components/ui/Subsection"
import Label from "components/ui/Label"
import Input from "components/ui/Input"
import Icon from "components/ui/Icon"

import { useFormContext, Controller } from "react-hook-form"
import { FormProvider } from "react-hook-form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import schema, { passwordConditions } from "validation/change-password-form";

import styles from "./change-password-form.module.scss"
import Button from "components/ui/Button"

const ChangePassForm = ({onSubmit, disabled}) => {
  const { register, handleSubmit, formState, watch } = useForm({
    resolver: zodResolver(schema),
  });

  const password = watch("new_password");

  return(
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        data-dirty={formState.isDirty}
      >
        <Subsection
          title="Изменить пароль"
          required
        >
          <div className={styles.inputs}>
            <Label title="Текущий пароль*" hasError={formState.errors.previous_password}>
              <Input {...register("previous_password")}/>
            </Label>

              <Label title="Новый пароль*" hasError={formState.errors.new_password}>
              <Input {...register("new_password")}/>
            </Label>
            

            <Label title="Пароль должен содержать">
              {passwordConditions.map((cond, index) => {
                const isValid = cond.regex.test(password || "");
                return (
                  <div key={index} className={isValid ? styles.check : styles.error}>
                    <Icon slug={isValid ? "check" : "x"} />
                    <span>{cond.message}</span>
                  </div>
                );
              })}
            </Label>
            
            <Label title="Подтверди пароль*" hasError={formState.errors.password_confirm}>
              <Input {...register("password_confirm")}/>
            </Label>
            
            <Button className={styles.button} type="submit" disabled={disabled}>
              Изменить
            </Button>
          </div>
        </Subsection>
      </form>
  )
}

export default ChangePassForm