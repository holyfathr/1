import { forwardRef } from "react"

import Checkbox from "components/ui/Checkbox"

const Radio = (props, ref) => <Checkbox type="radio" {...props} ref={ref} />

export default forwardRef(Radio)
