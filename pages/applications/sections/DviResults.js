import DviSummary from "components/ui/DviSummary"
import Subsection from "components/ui/Subsection"

import styles from "../applications.module.scss"

const DviResults = () => (
  <Subsection title="Результаты ДВИ:" contentClassName={styles.dviGrid}>
    <DviSummary
      dvi={{
        description: "Специфика обществознания и основные этапы его развития",
        date: "2022-07-26",
        result: 100,
      }}
    />
  </Subsection>
)

export default DviResults
