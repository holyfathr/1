import { useFormContext } from "react-hook-form"

import Input from "components/ui/Input"
import Label from "components/ui/Label"

const Contacts = () => {
  const { register, formState } = useFormContext()

  return (
    <Label
      title="Ссылка на сайт образовательной программы"
      hasError={formState.errors.link_to_university_info}
    >
      <Input {...register("link_to_university_info")} type="url" />
    </Label>
  )
}

export default Contacts
