import { useFormContext } from "react-hook-form"

import Subsection from "components/ui/Subsection"
import Checkbox from "components/ui/Checkbox"
import Radio from "components/ui/Radio"

import styles from "../profile-form.module.scss"

const EducationLevel = () => {
  const { register } = useFormContext()

  return (
    <Subsection
     title="Выбери уровень нужного образования" 
     description="Можешь выбрать несколько" 
     contentClassName={styles.education}
    >
      <Radio {...register("education_level")} value="P" >Подготовительный факультет</Radio>
      <Radio {...register("education_level")} value="S" >Специалитет</Radio>
      <Radio {...register("education_level")} value="B" >Бакалавриат</Radio>
      <Radio {...register("education_level")} value="M" disabled >Магистратура</Radio>
    </Subsection>
  )
}

export default EducationLevel
