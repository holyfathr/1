import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import FileUploadContainer from "components/containers/FileUploadContainer"

import { getEntrantSex } from "helpers/enums"
import { formatDate } from "helpers/language"

import styles from "../applications.module.scss";

const Personal = ({ application }) => {

  console.log(application)

  return (
    <div className={styles.inputs}>
      <FileUploadContainer
        readOnly
        className={styles.faceImage}
        value={application.entrant_obj.face_image_link}
      />

      <Subsection
        title="Личные данные"
        contentClassName={styles.sideInputs}
      >
        <Label title="Пол" >
          {getEntrantSex(application.entrant_obj.sex)}
        </Label>

        <Label title="Фамилия">
          {application.entrant_obj.surname}
        </Label>

        <Label title="Имя">
          {application.entrant_obj.name}
        </Label>


        <Label title="Отчество">
          {application.entrant_obj.middle_name}
        </Label>

        <Label title="Дата рождения*">
          {formatDate(application.entrant_obj.date_of_birth)}
        </Label>
      </Subsection>
    </div>
  )
}

export default Personal
