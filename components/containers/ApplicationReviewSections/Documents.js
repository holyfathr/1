import { Controller, useFormContext } from "react-hook-form";
import Label from "components/ui/Label";
import Subsection from "components/ui/Subsection";
import FileUploadContainer from "components/containers/FileUploadContainer";

import { getCitizenship, getEducationLevel } from "helpers/enums";
import { formatDateYear, formatDate } from "helpers/language";

import styles from "./application-review.module.scss";

const Documents = ({ overview, application }) => {
  const { control, formState } = useFormContext();

  return (
    <Subsection title="Документы" contentClassName={styles.program}>
        <div className={styles.rowInputs}>
          <Controller
            control={control}
            name="entrant.doc_image_link"
            render={({ field }) => (
              <FileUploadContainer
                  title="Копия и перевод документа, удостоверяющего личность(паспорт)"
                  description="(jpeg, png, PDF)"
                  accept="image/jpeg,image/png,application/pdf"
                  variant="tiny"
                  className={styles.upload}
                  readOnly={overview}
                  hasError={formState.errors?.doc_image_link}
                  {...field}
              />
            )}
          />

          <div className={styles.documents}>
            <Label title="Тип документа*">
              {application.entrant.doc_type}
            </Label>
            <Label title="Страна выдачи*">
              {getCitizenship(application.entrant.doc_country_issued)}
            </Label>
          </div>

          <div className={styles.documents}>    
            <Label
                title="Номер документа*"
                hasError={formState.errors?.doc_number}
              >
                {application.entrant.doc_number}
              </Label>

              <Label
                title="Дата выдачи*"
                hasError={formState.errors?.doc_date_issued}
              >
                {formatDate(application.entrant.doc_date_issued)}
              </Label>
          </div>        
        </div>
        
        <div className={styles.rowInputs}>
          <Controller
            control={control}
            name="entrant.diploma_image_link"
            render={({ field }) => (
              <FileUploadContainer
                  title="Копия и перевод документа об образовании(диплом или сертификат)"
                  description="(jpeg, png, PDF)"
                  accept="image/jpeg,image/png,application/pdf"
                  variant="tiny"
                  className={styles.upload}
                  readOnly={overview}
                  hasError={formState.errors?.diploma_image_link}
                  {...field}
              />
            )}
          />
          <Label title="Уровень имеющегося образования*">
            {getEducationLevel(application.entrant.education_level)}
          </Label>
          <Label title="Год выдачи*">
            {formatDateYear(application.entrant.diploma_date_issued)}
          </Label>
        </div>
    </Subsection>
  );
};

export default Documents;
