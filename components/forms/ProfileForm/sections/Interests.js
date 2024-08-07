import { useFormContext, useWatch } from "react-hook-form"
import xorBy from "lodash/xorBy"

import BubblePicker from "components/ui/BubblePicker"
import Subsection from "components/ui/Subsection"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

const Interests = () => {
  const { control, setValue } = useFormContext()
  const pickedInterests = useWatch({ control, name: "interests" })

  const { data: interests = [] } = useDefinedQuery(keys.interests)

  const isSelected = (interest) => {
    return !!pickedInterests.find(({ id }) => id === interest.id)
  }

  const onChange = (interest) => {
    const newPickedInterests = xorBy(pickedInterests, [interest], "id")
    setValue("interests", newPickedInterests)
  }

  return (
    <Subsection
      title="Укажи свои интересы"
      description="Это поможет нам оптимизировать поиск и выбор вузов и образовательных программ по твоим интересам"
    >
      <BubblePicker>
        {interests.map((interest) => (
          <BubblePicker.Bubble
            key={interest.id}
            onChange={() => onChange(interest)}
            checked={isSelected(interest)}
          >
            {interest.interest_title}
          </BubblePicker.Bubble>
        ))}
      </BubblePicker>
    </Subsection>
  )
}

export default Interests
