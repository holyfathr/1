import clsx from "clsx"

import ProgramBreadcrumbs from "components/partials/ProgramBreadcrumbs"
import Card from "components/ui/Card"
import TrainingForm from "components/ui/TrainingForm"

import styles from "./program-overview-card.module.scss"

const ProgramOverviewCard = ({ program, className, ...props }) => {
  className = clsx(styles.card, className)

  return (
    <Card className={className} {...props}>
      <div className={styles.header}>
        {program.faculty_obj.city}
      </div>

      <h2 className={styles.title}>{program.title}</h2>
    </Card>
  )
}

export default ProgramOverviewCard
