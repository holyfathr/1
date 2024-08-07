import NumberFormat from "react-number-format"
import { forwardRef } from "react"

import Input from "components/ui/Input"

const NumberInput = (props, ref) => {
  return <NumberFormat customInput={Input} {...props} getInputRef={ref} />
}

export default forwardRef(NumberInput)
