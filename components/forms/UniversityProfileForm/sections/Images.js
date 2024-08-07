import { Controller, useFormContext } from "react-hook-form"

import FileUploadContainer from "components/containers/FileUploadContainer"

import styles from "../university-profile-form.module.scss"

const Images = () => {
  const { control } = useFormContext()

  return (
    <div className={styles.uploads}>
      <Controller
        control={control}
        name="logo_link"
        render={({ field }) => (
          <FileUploadContainer
            title="Загрузите Ваш логотип"
            description="(jpeg, png)"
            accept="image/jpeg,image/png"
            className={styles.upload}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="image_link"
        render={({ field }) => (
          <FileUploadContainer
            title="Загрузите фотографию Вашего вуза"
            objectFit="cover"
            description="(jpeg, png)"
            accept="image/jpeg,image/png"
            className={styles.upload}
            {...field}
          />
        )}
      />
    </div>
  )
}

export default Images
