import { Controller, useFormContext } from "react-hook-form"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import FileUploadContainer from "components/containers/FileUploadContainer"
import Select from "components/ui/Select"
import DateInput from "components/ui/DateInput"

import styles from "../information.module.scss"
import Icon from "components/ui/Icon"

const Personal = ({ overview }) => {
  const { register, control, formState } = useFormContext()

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
            className={styles.faceImage}
            readOnly={overview}
            accept="image/jpeg,image/png,application/pdf"
            {...field}
          />
        )}
      />

      <Subsection
        title="Личные данные"
        description="Введи свои личные данные точно так, как они указаны в официальных документах, таких как паспорт, свидетельство о рождении или водительское удостоверение."
        contentClassName={styles.sideInputs}
      >
        <Label title="Твой пол*" hasError={formState.errors.entrant?.sex}>
          <Controller
            control={control}
            name="entrant.sex"
            render={({ field }) => (
              <Select
                placeholder="Выбери опцию"
                variant="thin"
                hasError={formState.errors.entrant?.sex}
                readOnly={overview}
                options={[
                  { value: "M", label: "Мужской" },
                  { value: "F", label: "Женский" },
                ]}
                {...field}
                ref={register(field.name).ref}
              />
            )}
          />
        </Label>

        <Label
          title={overview ? "Твоя фамилия*" : "Фамилия"}
          hasError={formState.errors.entrant?.surname}
        >
          <Input {...register("entrant.surname")} readOnly={overview} />
        </Label>

        <Label
          title={overview ? "Имя" : "Твоё имя*"}
          hasError={formState.errors.entrant?.name}
        >
          <Input {...register("entrant.name")} readOnly={overview} />
        </Label>


        <Label
          title={overview ? "Отчество" : "Твоё отчество (при наличии)"}
          hasError={formState.errors.entrant?.middle_name}
        >
          <Input {...register("entrant.middle_name")} readOnly={overview} />
        </Label>

        <Label title="Дата рождения*" hasError={formState.errors.entrant?.date_of_birth}>
          <Controller
            control={control}
            name="date_of_birth"
            render={({ field }) => (
              <DateInput
                readOnly={overview}
                hasError={formState.errors.date_of_birth}
                {...field}
                // ref={register(field.name).ref}
              />
            )}
          />
        </Label>
      </Subsection>
    </div>
  )
}

export default Personal
