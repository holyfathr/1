import { useFormContext } from "react-hook-form"

import IntegerInput from "components/ui/IntegerInput"
import Subsection from "components/ui/Subsection"
import InputsCloud from "components/ui/InputsCloud"

const Capacity = () => {
  const { register, formState } = useFormContext()

  return (
    <Subsection title="Количество мест*">
      <InputsCloud>
        <IntegerInput
          min={0}
          max={999}
          title="Бюджет"
          hasError={formState.errors.num_budget_positions}
          {...register("num_budget_positions", { valueAsNumber: true })}
        />

        <IntegerInput
          min={0}
          max={999}
          title="Коммерция"
          hasError={formState.errors.num_commercial_positions}
          {...register("num_commercial_positions", { valueAsNumber: true })}
        />
      </InputsCloud>
    </Subsection>
  )
}

export default Capacity
