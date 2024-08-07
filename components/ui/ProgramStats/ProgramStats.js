import clsx from "clsx"

import styles from "./program-stats.module.scss"
import Row from "../Row"
import ProgramHighlightsV2 from "../ProgramInfo/ProgramHighlightsV2"

const ProgramStats = ({ program, className, ...props }) => {
  className = clsx(styles.stats, className)

  return (
    <div className={className} {...props}>
      <Row>
        <ProgramHighlightsV2 program={program}/>
      </Row>
    </div>
  )
}

export default ProgramStats
