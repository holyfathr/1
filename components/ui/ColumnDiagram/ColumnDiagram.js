import clsx from "clsx"
import { useMemo } from "react"

import DiagramLegend from "components/ui/DiagramLegend"

import styles from "./column-diagram.module.scss"

const ColumnDiagram = ({ data, maxColumns = 5, className, ...props }) => {
  const columns = useMemo(() => getColumns(data, maxColumns), [data, maxColumns])

  className = clsx(styles.wrapper, className)

  return (
    <div className={className} {...props}>
      <div className={styles.diagram}>
        {columns.map(({ color, percentage }, index) => (
          <div
            key={index}
            className={styles.column}
            style={{
              backgroundColor: color,
              height: percentage + "%",
              width: 100 / columns.length + "%",
            }}
          />
        ))}
      </div>

      <DiagramLegend className={styles.legend}>
        {columns.map(({ percentage, color, title }, index) => (
          <DiagramLegend.Entry percentage={percentage} color={color} key={index}>
            {title}
          </DiagramLegend.Entry>
        ))}
      </DiagramLegend>
    </div>
  )
}

const getColumns = (data, maxCount) => {
  const columns = []
  let remainingPercentage = 100

  for (const [index, entry] of data.entries()) {
    // One column is reserved for "Others"
    if (data.length >= maxCount && index + 1 === maxCount) break

    columns.push(entry)
    remainingPercentage -= entry.percentage
  }

  if (data.length >= maxCount)
    columns.push({ title: "Другие", percentage: remainingPercentage })

  return columns
}

export default ColumnDiagram
