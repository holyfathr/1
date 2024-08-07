import clsx from "clsx"

import Breadcrumbs from "components/ui/Breadcrumbs"
import Threshold from "components/ui/Threshold"

import styles from "./program-exams.module.scss"

const ProgramExams = ({ program, className, ...props }) => {
  className = clsx(styles.exams, className)

  return (
    <div className={className} {...props}>
      <strong>Предметы ЕГЭ:</strong>

      <ol className={styles.list}>
        {program.use_thresholds.map((thresholds, index) => (
          <Thresholds thresholds={thresholds} key={index} />
        ))}
      </ol>
    </div>
  )
}

const Thresholds = ({ thresholds }) => (
  <li>
    <Breadcrumbs>
      {thresholds.map((threshold) => (
        <Breadcrumbs.Item key={threshold.id}>
          <Threshold value={`${threshold.use_threshold}+`} valueClassName={styles.value}>
            {threshold.use_title}
          </Threshold>
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  </li>
)

export default ProgramExams
