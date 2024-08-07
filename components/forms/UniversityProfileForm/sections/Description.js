import Input from "components/ui/Input"
import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import TextArea from "components/ui/TextArea"

import useLimitedInput from "hooks/use-limited-input"

import styles from "../university-profile-form.module.scss"

const Description = () => {
  const shortDescription = useLimitedInput("short_description", 200)
  const fullDescription = useLimitedInput("full_description", 1000)

  return (
    <div className={styles.rowInputs}>
      {/* <Label title={`Краткое описание (${shortDescription.leftFormatted})`}>
        <Input {...shortDescription.props} />
      </Label> */}
      <Label title={`Подробное описание (${fullDescription.leftFormatted})`}>
        <TextArea {...fullDescription.props} />
      </Label>
    </div>
  )
}

export default Description
