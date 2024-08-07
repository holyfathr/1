import { useFormContext } from "react-hook-form"

import ColorPicker from "components/ui/ColorPicker"
import Subsection from "components/ui/Subsection"

import styles from "../university-profile-form.module.scss"

const Background = () => {
  const { register } = useFormContext()

  return (
    <Subsection title="Или можете выбрать наш фон:">
      <ColorPicker className={styles.picker}>
        {["#1E60F6", "#919295"].map((color) => (
          <ColorPicker.Option
            key={color}
            value={color}
            {...register("background_color")}
          />
        ))}
      </ColorPicker>
    </Subsection>
  )
}

export default Background
