import { useFormContext } from "react-hook-form"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import TextArea from "components/ui/TextArea"

import useLimitedInput from "hooks/use-limited-input"

import styles from "../university-profile-form.module.scss"

const Information = () => {
  const { register, formState } = useFormContext()

  const fullDescription = useLimitedInput("full_description", 1000)

  return (
    <Subsection title="Информация о вузе" >
      <div className={styles.inputs}>
        <Label title="Полное название*" hasError={formState.errors.title}>
          <Input {...register("title")} />
        </Label>

        <Label title="Короткое название" hasError={formState.errors.abbreviation}>
          <Input {...register("abbreviation")} />
        </Label>
      </div>

      <div className={styles.description}>
        <Label title={`Описание (до 2,000 символов)*`}>
          <TextArea {...register("full_description")} />
        </Label>
      </div>
    </Subsection>
  )
}

export default Information
