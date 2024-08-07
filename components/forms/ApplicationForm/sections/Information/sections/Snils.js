import { Controller, useFormContext } from "react-hook-form"

import Label from "components/ui/Label"
import QuestionButton from "components/ui/QuestionButton"
import Subsection from "components/ui/Subsection"
import TipOverlay from "components/ui/TipOverlay"
import NumberInput from "components/ui/NumberInput"
import FileUploadContainer from "components/containers/FileUploadContainer"

import useToggle from "hooks/use-toggle"

import styles from "../information.module.scss"

const Snils = ({ overview }) => {
  const { control, formState } = useFormContext()

  const [tipVisible, toggleTipVisible] = useToggle(false)

  return (
    <Subsection
      title={
        <>
          СНИЛС
          {!overview && (
            <QuestionButton onClick={toggleTipVisible} className={styles.question} />
          )}
        </>
      }
      contentClassName={styles.inputs}
    >
      <Controller
        control={control}
        name="entrant.snils_image_link"
        render={({ field }) => (
          <TipOverlay
            content="Номер СНИЛС — последовательность из 11 цифр над вашим именем на зеленой карточке или верхняя строка на уведомлении по новой форме, если вы не получали карточку."
            visible={tipVisible}
          >
            <FileUploadContainer
              title={overview ? "Скан СНИЛСа" : "Загрузи скан СНИЛСа"}
              description="(jpeg, png, PDF)"
              accept="image/jpeg,image/png,application/pdf"
              variant="tiny"
              readOnly={overview}
              className={styles.upload}
              hasError={formState.errors.entrant?.snils_image_link}
              {...field}
            />
          </TipOverlay>
        )}
      />

      <div className={styles.sideInputs}>
        <Label title="Номер СНИЛС*" hasError={formState.errors.entrant?.snils}>
          <Controller
            name="entrant.snils"
            control={control}
            render={({ field }) => (
              <NumberInput
                readOnly={overview}
                format="###-###-### ##"
                mask="_"
                allowEmptyFormatting={!overview}
                hasError={formState.errors.entrant?.snils}
                {...field}
              />
            )}
          />
        </Label>
      </div>
    </Subsection>
  )
}

export default Snils
