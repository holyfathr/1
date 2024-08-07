import { Controller, useFormContext } from "react-hook-form"

import FileUploadContainer from "components/containers/FileUploadContainer"

import styles from "../faculty-profile-form.module.scss"

const Logo = () => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name="logo_link"
      render={({ field }) => (
        <FileUploadContainer
          title="Загрузите Ваш логотип"
          description="(jpeg, png)"
          accept="image/jpeg,image/png"
          className={styles.logo}
          {...field}
        />
      )}
    />
  )
}

export default Logo
