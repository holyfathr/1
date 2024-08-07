import { Controller, useFormContext } from "react-hook-form"

import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import Select from "components/ui/Select"
import NumberInput from "components/ui/NumberInput"
import DateInput from "components/ui/DateInput"
import Input from "components/ui/Input"
import FileUploadContainer from "components/containers/FileUploadContainer"

import styles from "../information.module.scss"

const Education = ({ overview }) => {
  const { control, formState, register } = useFormContext()

  return (  
    <Subsection title="Документ об образовании" contentClassName={styles.rowInputs}>
      <Label
        title="Тип документа*"
        hasError={formState.errors.entrant?.education_document?.type}
      >
        <Controller
          control={control}
          name="entrant.education_document.type"
          render={({ field }) => (
            <Select
              placeholder="Выбери"
              variant="thin"
              valueKey="label"
              hasError={formState.errors.entrant?.education_document?.type}
              readOnly={overview}
              options={[{ label: "Аттестат 11 кл" }]}
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Год получения*"
        hasError={formState.errors.entrant?.education_document?.issue_year}
      >
        <Controller
          name="entrant.education_document.issue_year"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <NumberInput
              onValueChange={({ floatValue }) => onChange(floatValue)}
              readOnly={overview}
              hasError={formState.errors.entrant?.education_document?.issue_year}
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Дата выдачи*"
        hasError={formState.errors.entrant?.education_document?.date_of_issue}
      >
        <Controller
          control={control}
          name="entrant.education_document.date_of_issue"
          render={({ field }) => (
            <DateInput
              readOnly={overview}
              hasError={formState.errors.entrant?.education_document?.date_of_issue}
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Серия"
        hasError={formState.errors.entrant?.education_document?.serial_number}
      >
        <Input
          {...register("entrant.education_document.serial_number")}
          readOnly={overview}
        />
      </Label>

      <Label
        title="Номер*"
        hasError={formState.errors.entrant?.education_document?.number}
      >
        <Input {...register("entrant.education_document.number")} readOnly={overview} />
      </Label>
 
      <Label
        title="Страна выдачи*"
        hasError={formState.errors.entrant?.education_document?.country}
      >
        <Input {...register("entrant.education_document.country")} readOnly={overview} />
      </Label>

      <Label
        title="Кем выдан*"
        hasError={formState.errors.entrant?.education_document?.issued_by}
      >
        <Controller
          control={control}
          name="entrant.education_document.issued_by"
          render={({ field }) => (
            <Select
              placeholder="Выбери"
              variant="thin"
              valueKey="label"
              readOnly={overview}
              hasError={formState.errors.entrant?.education_document?.issued_by}
              options={[
                { label: "Средняя школа" },
                { label: "Вечерняя (сменная) школа" },
              ]}
              {...field}
            />
          )}
        />
      </Label>

      <span />
      <span />

      <Controller
        control={control}
        name="entrant.education_document.image_link"
        render={({ field }) => (
          <FileUploadContainer
            title="Документ об образовании (аттестат, диплом)"
            description="(jpeg, png, PDF)"
            accept="image/jpeg,image/png,application/pdf"
            variant="tiny"
            className={styles.upload}
            readOnly={overview}
            hasError={formState.errors.entrant?.education_document?.image_link}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="entrant.education_document.appendix_image_link"
        render={({ field }) => (
          <FileUploadContainer
            title="Приложение к документу об образовании (все страницы)"
            description="(jpeg, png, PDF)"
            accept="image/jpeg,image/png,application/pdf"
            variant="tiny"
            className={styles.upload}
            readOnly={overview}
            hasError={formState.errors.entrant?.passport_info?.appendix_image_link}
            {...field}
          />
        )}
      />
    </Subsection>
  )
}

export default Education
