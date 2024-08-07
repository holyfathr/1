import clsx from "clsx"
import { useMemo } from "react"

import DiagramLegend from "components/ui/DiagramLegend"

import styles from "./circle-diagram.module.scss"

const CircleDiagram = ({ data, className, ...props }) => {
  const gradient = useMemo(() => getGradient(data), [data])

  className = clsx(styles.wrapper, className)

  return (
    <div className={className} {...props}>
      <div className={styles.diagram} style={{ background: gradient }}>
        <div className={styles.inner} />
      </div>

      <DiagramLegend>
        {data.map(({ percentage, color, title }, index) => (
          <DiagramLegend.Entry percentage={percentage} color={color} key={index}>
            {title}
          </DiagramLegend.Entry>
        ))}
      </DiagramLegend>
    </div>
  )
}

const getGradient = (data) => {
  const stops = data.map((entry, index) => {
    const prevPercentage = index > 0 ? data[index - 1].percentage : 0
    return `${entry.color} ${prevPercentage}% ${entry.percentage}%`
  })

  return `conic-gradient(${stops.join(", ")})`
}

export default CircleDiagram
