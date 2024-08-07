import { useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import flatMapDeep from "lodash/flatMapDeep"
import uniqBy from "lodash/uniqBy"

import Results from "./Results"

import { renameKeys } from "helpers/objects"

const ResultsContainer = (props) => {
  const { control } = useFormContext()
  const programs = useWatch({ name: "programs", control })

  const subjects = useMemo(() => {
    const thresholds = flatMapDeep(programs, "use_thresholds")
    const uniqueThresholds = uniqBy(thresholds, "use")

    return uniqueThresholds.map((t) =>
      renameKeys(t, { use: "id", use_title: "exam_title" })
    )
  }, [programs])

  return <Results subjects={subjects} {...props} />
}

export default ResultsContainer
