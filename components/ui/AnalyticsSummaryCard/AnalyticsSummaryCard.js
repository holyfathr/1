import clsx from "clsx"

import Card from "components/ui/Card"

import styles from "./analytics-summary-card.module.scss"

const AnalyticsSummaryCard = ({ title, children, className, ...props }) => {
  className = clsx(styles.card, className)

  return (
    <Card className={className} {...props}>
      <p className={styles.title}>{title}</p>
      <p className={styles.discription}>{children}</p>
    </Card>
  )
}

export default AnalyticsSummaryCard
