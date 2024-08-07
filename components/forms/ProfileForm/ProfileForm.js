import clsx from "clsx"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import merge from "lodash/merge"
import { useTranslation } from "next-i18next"

import BasicInfo from "./sections/BasicInfo"
import EducationLevel from "./sections/EducationLevel"
import Interests from "./sections/Interests"
import Button from "components/ui/Button"

import schema from "validation/profile-form"

import styles from "./profile-form.module.scss"

const ProfileForm = ({ defaultValues, onSubmit, disabled, className, ...props }) => {
  const { t } = useTranslation("common")

  const methods = useForm({
    defaultValues: merge(
      { interests: [] },
      defaultValues
    ),
    resolver: zodResolver(schema),
  })

  className = clsx(styles.form, className)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        data-dirty={methods.formState.isDirty}
        {...props}
      >
        <BasicInfo />
        <Interests />
        <EducationLevel />

        <Button className={styles.submit} type="submit">
          {t("save")}
        </Button>
      </form>
    </FormProvider>
  )
}

export default ProfileForm
