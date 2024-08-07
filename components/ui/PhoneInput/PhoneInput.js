import { forwardRef } from "react"

import Input from "components/ui/Input"

const PhoneInput = (props, ref) => <Input type="tel" {...props} ref={ref} />

export default forwardRef(PhoneInput)
