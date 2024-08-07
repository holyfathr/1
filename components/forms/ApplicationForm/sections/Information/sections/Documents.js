import { Controller, useFormContext } from "react-hook-form";
import DateInput from "components/ui/DateInput";
import Input from "components/ui/Input";
import Label from "components/ui/Label";
import Subsection from "components/ui/Subsection";
import NumberInput from "components/ui/NumberInput";
import FileUploadContainer from "components/containers/FileUploadContainer";
import Select from "components/ui/Select";

import styles from "../information.module.scss";

const Documents = ({ overview }) => {
  const { register, control, formState } = useFormContext();

  return (
    <Subsection title="Документы" contentClassName={styles.program}>
      <p className={styles.text}>
        Документы, составленные на языке, отличном от русского, должны сопровождаться официальным или
        нотариально заверенным переводом. Перевод в обязательном порядке должен сшиваться с оригиналом, 
        копией или нотариально заверенной копией документа. Заявки без переводов будут возвращены для повторной подачи.
      </p>
      <div className={styles.docSection}>
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
                  // hasError={formState.errors?.entrant?.doc_image_link}
                  {...field}
              />
            )}
          />

          <div className={styles.documents}>
            <Label
              title="Тип документа*"
              hasError={formState.errors?.doc_type}
            >
              <Controller
                control={control}
                name="doc_type"
                render={({ field }) => (
                  <Select
                    placeholder="Выбери опцию"
                    variant="thin"
                    valueKey="label"
                    readOnly={overview}
                    hasError={formState.errors?.doc_type}
                    options={[
                      {value: "Заграничный паспорт", label: "Заграничный паспорт" },
                      {value: "Национальный паспорт", label: "Национальный паспорт" },
                      {value: "Вид на жительство", label: "Вид на жительство" },
                      {value: "Разрешение на временное проживание", label: "Разрешение на временное проживание" },
                      {value: "Иные документы", label: "Иные документы" },
                    ]}
                    {...field}
                    ref={register(field.name).ref}
                  />
                )}
              />
            </Label>
            <Label title="Страна выдачи*" hasError={formState.errors?.doc_country_issued}>
              <Controller
                control={control}
                name="doc_country_issued"
                render={({ field }) => (
                  <Select
                    placeholder="Выбери из списка"
                    variant="thin"
                    hasError={formState.errors?.doc_country_issued}
                    options={[
                      { "value": "N", "label": "Лицо без гражданства" },
                      { "value": "BY", "label": "Беларусь" },
                      { "value": "EG", "label": "Египет" },
                      { "value": "IN", "label": "Индия" },
                      { "value": "KZ", "label": "Казахстан" },
                      { "value": "KG", "label": "Киргизия" },
                      { "value": "CN", "label": "Китай" },
                      { "value": "MA", "label": "Марокко" },
                      { "value": "NG", "label": "Нигерия" },
                      { "value": "SR", "label": "Сербия" },
                      { "value": "SY", "label": "Сирия" },
                      { "value": "TJ", "label": "Таджикистан" },
                      { "value": "TH", "label": "Таиланд" },
                      { "value": "TM", "label": "Туркменистан" },
                      { "value": "TR", "label": "Турция" },
                      { "value": "UZ", "label": "Узбекистан" }
                    ]}
                    {...field}
                    ref={register(field.name).ref}
                  />
                )}
              />
            </Label>
          </div>

          <div className={styles.documents}>    
            <Label
                title="Номер документа*"
                hasError={formState.errors?.doc_number}
              >
                <Controller
                  name="doc_number"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      readOnly={overview}
                      format="## ## ######"
                      mask="_"
                      allowEmptyFormatting={overview}
                      hasError={formState.errors?.doc_number}
                      {...field}
                      ref={register(field.name).ref}
                    />
                  )}
                />
              </Label>

              <Label
                title="Дата выдачи*"
                hasError={formState.errors?.doc_date_issued}
              >
                <Controller
                  control={control}
                  name="doc_date_issued"
                  render={({ field }) => (
                    <DateInput
                      readOnly={overview}
                      hasError={formState.errors?.doc_date_issued}
                      {...field}
                    />
                  )}
                />
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
                  hasError={formState.errors?.entrant?.diploma_image_link}
                  {...field}
              />
            )}
          />
          <Label
            title="Уровень имеющегося образования*"
            hasError={formState.errors?.education_level	}
            className={styles.selects}
          >
            <Controller
              control={control}
              name="education_level	"
              render={({ field }) => (
                <Select
                  placeholder="Выбери опцию"
                  variant="thin"
                  valueKey="label"
                  hasError={formState.errors?.education_level}
                  readOnly={overview}
                  options={[
                    { "value": "Среднее специальное образование", "label": "Среднее специальное образование" },
                    { "value": "Высшее образование", "label": "Высшее образование" },
                    { "value": "Другое", "label": "Другое" },
                  ]}
                  {...field}
                  ref={register(field.name).ref}
                />
              )}
            />
          </Label>
          <Label
            title="Год выдачи*"
            hasError={formState.errors?.diploma_date_issued}
            className={styles.selects}
          >
            <Controller
              control={control}
              name="diploma_date_issued"
              render={({ field }) => (
                <DateInput
                  showYearPicker
                  dateFormat="yyyy"
                  readOnly={overview}
                  hasError={formState.errors?.diploma_date_issued}
                  format="ДД.ММ.ГГГГ"
                  {...field}
                />
              )}
            />
          </Label>
        </div>
      </div>
    </Subsection>
  );
};

export default Documents;
