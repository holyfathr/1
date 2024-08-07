import clsx from "clsx"

import AnalyticsSummaryCard from "components/ui/AnalyticsSummaryCard"

import { formatCount, formatCountNoun } from "helpers/language"

import styles from "./applications-analytics.module.scss"

const ApplicationsAnalytics = ({ analytics, className, ...props }) => {
  className = clsx(styles.analytics, className)

  return (
    <div className={className} {...props}>
      {Number.isFinite(analytics.applications_num) && (
        <AnalyticsSummaryCard title={analytics.applications_num}>
          {formatCountNoun(
            analytics.applications_num,
            "Поданная заявка",
            "Поданных заявки",
            "Поданных заявок"
          )}
        </AnalyticsSummaryCard>
      )}

      {Number.isFinite(analytics.first_priority) && (
        <AnalyticsSummaryCard
          title={formatCount(
            analytics.first_priority,
            "абитуриент",
            "абитуриента",
            "абитуриентов"
          )}
        >
          С первым приоритетом
        </AnalyticsSummaryCard>
      )}
    </div>
  )
}

export default ApplicationsAnalytics
