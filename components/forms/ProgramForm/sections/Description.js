import { useFormContext } from "react-hook-form"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import TextArea from "components/ui/TextArea"

import styles from "../program-form.module.scss"

const Description = () => {
  const { register, formState } = useFormContext()

  return (
    <div className={styles.description}>
      <Label
        title="Описание (до 2,000 символов)*"
        hasError={formState.errors.full_description}
      >
        <TextArea {...register("full_description")} />
      </Label>
    </div>
  )
}

export default Description
