import { Controller, useFormContext } from "react-hook-form"

import DateInput from "components/ui/DateInput"
import Input from "components/ui/Input"
import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import NumberInput from "components/ui/NumberInput"
import Tooltip from "components/proxies/Tooltip"
import Select from "components/ui/Select"
import FileUploadContainer from "components/containers/FileUploadContainer"

import styles from "../information.module.scss"

const Passport = ({ overview }) => {
  const { register, control, formState } = useFormContext()

  return (
    <Subsection title="Паспортные данные" contentClassName={styles.rowInputs}>
      <Tooltip
        content="Сейчас в рамках MVP нельзя выбрать гражданство, но скоро это станет возможным"
        placement="top"
      >
        <Label
          title={overview ? "Гражданство" : "Твоё гражданство*"}
          hasError={formState.errors.entrant?.citizenship}
        >
          <Input {...register("entrant.citizenship")} readOnly />
        </Label>
      </Tooltip>

      <Label
        title="Тип удостоверения личности*"
        hasError={formState.errors.entrant?.passport_info?.type}
      >
        <Controller
          control={control}
          name="entrant.passport_info.type"
          render={({ field }) => (
            <Select
              placeholder="Выбери"
              variant="thin"
              valueKey="label"
              readOnly={overview}
              hasError={formState.errors.entrant?.passport_info?.type}
              options={[
                { label: "Паспорт РФ" },
                { label: "Загранпаспорт РФ" },
                { label: "Временное удостоверение" },
              ]}
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Место рождения*"
        hasError={formState.errors.entrant?.passport_info?.birthplace}
      >
        <Input {...register("entrant.passport_info.birthplace")} readOnly={overview} />
      </Label>

      <Label
        title="Серия паспорта*"
        hasError={formState.errors.entrant?.passport_info?.serial_number}
      >
        <Controller
          name="entrant.passport_info.serial_number"
          control={control}
          render={({ field }) => (
            <NumberInput
              readOnly={overview}
              format="## ##"
              mask="_"
              allowEmptyFormatting={overview}
              hasError={formState.errors.entrant?.passport_info?.serial_number}
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Номер паспорта*"
        hasError={formState.errors.entrant?.passport_info?.number}
      >
        <Controller
          name="entrant.passport_info.number"
          control={control}
          render={({ field }) => (
            <NumberInput
              readOnly={overview}
              format="######"
              mask="_"
              allowEmptyFormatting={overview}
              hasError={formState.errors.entrant?.passport_info?.number}
              {...field}
            />
          )}
        />
      </Label>

      <span></span> 

      <Label
        title="Код подразделения*"
        hasError={formState.errors.entrant?.passport_info?.unit_code}
      >
        <Controller
          name="entrant.passport_info.unit_code"
          control={control}
          render={({ field }) => (
            <NumberInput
              readOnly={overview}
              format="###-###"
              mask="_"
              allowEmptyFormatting={overview}
              hasError={formState.errors.entrant?.passport_info?.unit_code}
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Кем выдан*"
        hasError={formState.errors.entrant?.passport_info?.issued_by}
      >
        <Input {...register("entrant.passport_info.issued_by")} readOnly={overview} />
      </Label>

      <Label
        title="Дата выдачи*"
        hasError={formState.errors.entrant?.passport_info?.date_of_issue}
      >
        <Controller
          control={control}
          name="entrant.passport_info.date_of_issue"
          render={({ field }) => (
            <DateInput
              readOnly={overview}
              hasError={formState.errors.entrant?.passport_info?.date_of_issue}
              {...field}
            />
          )}
        />
      </Label>

      <Controller
        control={control}
        name="entrant.passport_info.photo_page_image_link"
        render={({ field }) => (
          <FileUploadContainer
            title="Паспорт стр. с фотографией"
            description="(jpeg, png, PDF)"
            accept="image/jpeg,image/png,application/pdf"
            variant="tiny"
            className={styles.upload}
            readOnly={overview}
            hasError={formState.errors.entrant?.passport_info?.photo_image_link}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="entrant.passport_info.address_page_image_link"
        render={({ field }) => (
          <FileUploadContainer
            title="Паспорт стр. с регистрацией"
            description="(jpeg, png, PDF)"
            accept="image/jpeg,image/png,application/pdf"
            variant="tiny"
            className={styles.upload}
            readOnly={overview}
            hasError={formState.errors.entrant?.passport_info?.address_page_image_link}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="entrant.passport_info.history_page_image_link"
        render={({ field }) => (
          <FileUploadContainer
            title="Паспорт 18-19 стр. «Сведения о ранее выданных паспортах»"
            description="(jpeg, png, PDF)"
            accept="image/jpeg,image/png,application/pdf"
            variant="tiny"
            className={styles.upload}
            readOnly={overview}
            hasError={formState.errors.entrant?.passport_info?.history_page_image_link}
            {...field}
          />
        )}
      />
    </Subsection>
  )
}

export default Passport
