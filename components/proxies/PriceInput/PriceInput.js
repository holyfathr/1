import { forwardRef } from "react"

import NumberInput from "components/ui/NumberInput"

const PriceInput = ({ onChange, ...props }, ref) => (
  <NumberInput
    thousandSeparator=" "
    suffix=" ₽"
    onValueChange={({ floatValue }) => onChange(floatValue ?? "")}
    {...props}
    ref={ref}
  />
)

export default forwardRef(PriceInput)
