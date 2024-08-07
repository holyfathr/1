import DviSummary from "components/ui/DviSummary"
import Subsection from "components/ui/Subsection"

import styles from "../applications.module.scss"

const Dvi = ({ application }) => {
  if (!application.dvi.length) return null

  return (
    <Subsection title="Информация о предстоящих ДВИ:" contentClassName={styles.dviGrid}>
      {application.dvi.map((dvi) => (
        <DviSummary dvi={dvi} key={dvi.id} />
      ))}
    </Subsection>
  )
}

export default Dvi
