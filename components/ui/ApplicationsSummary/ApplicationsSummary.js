import clsx from "clsx"
import Link from "next/link"

import ApplicationsExportButtonsContainer from "components/containers/ApplicationsExportButtonsContainer"

import { formatCount } from "helpers/language"

import styles from "./applications-summary.module.scss"

const ApplicationsSummary = ({ summary, className, ...props }) => {
  className = clsx(styles.summary, className)

  return (
    <div className={className} {...props}>
      {Number.isFinite(summary.id) && (
        <Link href={`/pro/faculty/applications/table/${summary.id}/`}>
          <a className={styles.link} />
        </Link>
      )}

      <div className={styles.header}>
        <p className={styles.subTitle}>Образовательная программа</p>
        <h2 className={styles.title}>{summary.title}</h2>
      </div>

      <div className={styles.footer}>
        <strong className={styles.count}>
          {Number.isFinite(summary.applications_num) &&
            formatCount(summary.applications_num, "заявка", "заявки", "заявок")}
        </strong>

        <ApplicationsExportButtonsContainer
          programId={summary.id}
          className={styles.buttons}
        />
      </div>
    </div>
  )
}

export default ApplicationsSummary
