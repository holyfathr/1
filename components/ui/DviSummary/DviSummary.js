import clsx from "clsx"
import { useMemo } from "react"

import Link from "components/ui/Link"

import { formatDate } from "helpers/language"

import styles from "./dvi-summary.module.scss"

const DviSummary = ({ dvi, className, ...props }) => {
  const formattedDate = useMemo(() => formatDate(dvi.date), [dvi.date])

  className = clsx(styles.summary, className)

  return (
    <div className={className} {...props}>
      <p>{dvi.description}</p>

      {formattedDate && <p>{formattedDate}</p>}

      {dvi.link_to_additional_info && (
        <Link href={dvi.link_to_additional_info} variant="accent">
          Подробнее о ДВИ
        </Link>
      )}

      {dvi.result && <div className={styles.result}>{dvi.result}</div>}
    </div>
  )
}

export default DviSummary
