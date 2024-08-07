import Label from "components/ui/Label"
import Subsection from "components/ui/Subsection"
import TextArea from "components/ui/TextArea"

import useLimitedInput from "hooks/use-limited-input"

import styles from "../faculty-profile-form.module.scss"

const Description = () => {
  const shortDescription = useLimitedInput("short_description", 200)
  const fullDescription = useLimitedInput("full_description", 1000)

  return (
    <Subsection title="Описание" contentClassName={styles.descriptions}>
      {/* <Label title={`Краткое описание (${shortDescription.leftFormatted})`}>
        <Input {...shortDescription.props} />
      </Label> */}
      <Label>
        <TextArea {...fullDescription.props} placeholder="До 1000 символов"/>
      </Label>
    </Subsection>
  )
}

export default Description
