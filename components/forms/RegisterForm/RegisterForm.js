import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

import Button from "components/ui/Button";
import Checkbox from "components/ui/Checkbox";
import Input from "components/ui/Input";
import Label from "components/ui/Label";
import Link from "components/ui/Link";
import Icon from "components/ui/Icon";
import PasswordInput from "components/ui/PasswordInput";

import schema, { passwordConditions } from "validation/register-form";

import styles from "./register-form.module.scss";

const RegisterForm = ({ onSubmit, className, disabled }) => {
  const { i18n: { language }, t } = useTranslation("login");

  const { register, handleSubmit, formState, watch } = useForm({
    resolver: zodResolver(schema),
  });

  const password = watch("password");

  className = clsx(styles.form, className);

  return (
    <form
      className={className}
      onSubmit={handleSubmit(onSubmit)}
      data-dirty={formState.isDirty}
    >
      <div className={styles.inputs}>
        <Label title={t("emailTitle")} hasError={formState.errors.email}>
          <Input type="email" {...register("email")} />
        </Label>
      </div>

      <div className={styles.inputs}>
        <Label title={t("createPassword")} hasError={formState.errors.password}>
          <PasswordInput {...register("password")} />
        </Label>
        <Label title={t("confirmPassword")} hasError={formState.errors.password_confirm}>
          <PasswordInput {...register("password_confirm")} />
        </Label>
      </div>

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
      {language === "ru" ? (
        <Checkbox {...register("agreement")} hasError={formState.errors.agreement}>
          Согласен с{" "}
          <Link href="#" variant="accent">
            правилами пользования сервисом{" "}
          </Link>
          и
          <Link href="#" variant="accent">
            {" "}политикой конфидециальности
          </Link>
        </Checkbox>
      ) : (
        <Checkbox {...register("agreement")} hasError={formState.errors.agreement}>
          By checking this box, I agree to the{" "}
          <Link href="#" variant="accent">
            Terms of Use{" "}
          </Link>
          and{" "}
          <Link href="#" variant="accent">
            Privacy Policy
          </Link>
        </Checkbox>
      )}

      <Button className={styles.button} type="submit" disabled={disabled}>
        {t("labelReg")}
      </Button>
    </form>
  );
};

export default RegisterForm;
