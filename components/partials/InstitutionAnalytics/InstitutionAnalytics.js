import clsx from "clsx"

import AnalyticsSummaryCard from "components/ui/AnalyticsSummaryCard"
import Subsection from "components/ui/Subsection"
import CitizenshipDiagram from "components/partials/CitizenshipDiagram"
import SexDiagram from "components/partials/SexDiagram"

import { formatCount, formatCountNoun } from "helpers/language"

import styles from "./institution-analytics.module.scss"

const InstitutionAnalytics = ({ analytics, className, ...props }) => {
  className = clsx(styles.wrapper, className)

  return (
    <div className={className} {...props}>
      <div className={styles.grid}>
        {Number.isFinite(analytics?.applications_count) && (
          <AnalyticsSummaryCard title={analytics.applications_count}>
            {formatCountNoun(
              analytics.applications_count,
              "Поданная заявка",
              "Поданных заявки",
              "Поданных заявок"
            )}
          </AnalyticsSummaryCard>
        )}

        {analytics?.priority_entrants && (
          <AnalyticsSummaryCard
            title={formatCount(
              analytics?.priority_entrants[1],
              "абитуриент",
              "абитуриента",
              "абитуриентов"
            )}
          >
            С первым приоритетом
          </AnalyticsSummaryCard>
        )}

        {Number.isFinite(analytics?.max_total_score) && (
          <AnalyticsSummaryCard title={analytics.max_total_score}>
            Максимальный балл
          </AnalyticsSummaryCard>
        )}

        {Number.isFinite(analytics?.min_total_score) && (
          <AnalyticsSummaryCard title={analytics.min_total_score}>
            Минимальный балл
          </AnalyticsSummaryCard>
        )}

        {Number.isFinite(analytics?.average_total_score) && (
          <AnalyticsSummaryCard title={analytics.average_total_score}>
            Средний балл
          </AnalyticsSummaryCard>
        )}
      </div>

      <div className={styles.diagrams}>
        <Subsection title="Регионы абитуриентов">
          <CitizenshipDiagram
            citizenships={analytics?.citizenship_chart_entrants}
            totalCount={analytics?.unique_entrants_count}
          />
        </Subsection>

        <Subsection title="Пол">
          <SexDiagram
            maleCount={analytics?.entrant_males}
            femaleCount={analytics?.entrant_females}
            totalCount={analytics?.unique_entrants_count}
          />
        </Subsection>
      </div>
    </div>
  )
}

export default InstitutionAnalytics
