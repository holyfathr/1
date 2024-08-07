import clsx from "clsx"
import { forwardRef } from "react"

import FavouriteContainer from "components/containers/FavouriteContainer"
import Card from "components/ui/Card"
import ProgramBreadcrumbs from "components/partials/ProgramBreadcrumbs"
import ProgramHighlights from "components/ui/ProgramHighlights"

import styles from "./program-summary-card.module.scss"

const ProgramSummaryCard = ({ program, className, ...props }, ref) => {
  className = clsx(styles.card, className)

  return (
    <Card className={className} {...props} ref={ref}>
      <FavouriteContainer program={program} className={styles.favourite} />

      <ProgramBreadcrumbs program={program} className={styles.breadcrumbs} />
      <p className={styles.title}>{program.title}</p>
      <ProgramHighlights program={program} />
    </Card>
  )
}

export default forwardRef(ProgramSummaryCard)
