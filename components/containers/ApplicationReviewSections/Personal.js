import { Controller, useFormContext } from "react-hook-form"

import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import FileUploadContainer from "components/containers/FileUploadContainer"
import Icon from "components/ui/Icon"

import { getEntrantSex } from "helpers/enums"
import { formatDate } from "helpers/language"

import styles from "./application-review.module.scss";

const Personal = ({ overview, application }) => {
  const { control } = useFormContext()

  return (
    <div className={styles.inputs}>
      <Controller
        control={control}
        name="entrant.face_image_link"
        render={({ field }) => (
          <FileUploadContainer
            title={
              overview ? (
                "Фото"
              ) : (
                <>
                  <Icon slug="staple" className={styles.staple}/>
                  Загрузи
                  <br />
                  своё фото
                  <br />
                  <br />
                  <br />
                  Формат 3х4,
                  <br /> (ч/б или цветное)
                </>
              )
            }
            description="(jpeg, png, PDF)"
            readOnly={overview}
            accept="image/jpeg,image/png,application/pdf"
            {...field}
          />
        )}
      />

      <Subsection
        title="Личные данные"
        contentClassName={styles.sideInputs}
      >
        <Label title="Пол" >
          {getEntrantSex(application.entrant.sex)}
        </Label>

        <Label title="Фамилия">
          {application.entrant.surname}
        </Label>

        <Label title="Имя">
          {application.entrant.name}
        </Label>


        <Label title="Отчество">
          {application.entrant.middle_name}
        </Label>

        <Label title="Дата рождения*">
          {formatDate(application.entrant.date_of_birth)}
        </Label>
      </Subsection>
    </div>
  )
}

export default Personal
