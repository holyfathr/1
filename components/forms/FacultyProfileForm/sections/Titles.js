import { useFormContext } from "react-hook-form"

import Input from "components/ui/Input"
import Label from "components/ui/Label"
import TextArea from "components/ui/TextArea"

import useLimitedInput from "hooks/use-limited-input"

import styles from "../faculty-profile-form.module.scss"
import Subsection from "components/ui/Subsection"

const Titles = () => {
  const { register, formState } = useFormContext()
  const fullDescription = useLimitedInput("full_description", 1000)

  return (
    <Subsection title="Информация о факультете">
      <div className={styles.inputs}>
        <Label title="Полное название*" hasError={formState.errors.title}>
          <Input {...register("title")} />
        </Label>

        <Label title="Короткое название" hasError={formState.errors.abbreviation}>
          <Input {...register("abbreviation")} />
        </Label>
      </div>

      <div className={styles.description}>
        <Label>
          <TextArea {...fullDescription.props} placeholder="До 1000 символов"/>
        </Label>
      </div>
    </Subsection>
  )
}

export default Titles
