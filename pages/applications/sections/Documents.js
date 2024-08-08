import Label from "components/ui/Label";
import Subsection from "components/ui/Subsection";
import FileUploadContainer from "components/containers/FileUploadContainer";

import { getCitizenship, getEducationLevel } from "helpers/enums";
import { formatDateYear, formatDate } from "helpers/language";

import styles from "../applications.module.scss";

const Documents = ({ overview, application }) => {

  return (
    <Subsection title="Документы" contentClassName={styles.program}>
        <div className={styles.rowInputs}>
          <FileUploadContainer
            title="Копия и перевод документа, удостоверяющего личность(паспорт)"
            variant="tiny"
            value={application.entrant_obj.doc_image_link}
            className={styles.upload}
            readOnly={overview}
          />


          <div className={styles.documents}>
            <Label title="Тип документа*">
              {application.entrant_obj.doc_type}
            </Label>
            <Label title="Страна выдачи*">
              {getCitizenship(application.entrant_obj.doc_country_issued)}
            </Label>
          </div>

          <div className={styles.documents}>    
            <Label
                title="Номер документа*"
               
              >
                {application.entrant_obj.doc_number}
              </Label>

              <Label title="Дата выдачи*">
                {formatDate(application.entrant_obj.doc_date_issued)}
              </Label>
          </div>        
        </div>
        
        <div className={styles.rowInputs}>
          <FileUploadContainer
              title="Копия и перевод документа об образовании(диплом или сертификат)"
              variant="tiny"
              value={application.entrant_obj.diploma_image_link}
              className={styles.upload}
              readOnly={overview}
          />

          <Label title="Уровень имеющегося образования*">
            {getEducationLevel(application.entrant_obj.education_level)}
          </Label>
          <Label title="Год выдачи*">
            {formatDateYear(application.entrant_obj.diploma_date_issued)}
          </Label>
        </div>
    </Subsection>
  );
};

export default Documents;
