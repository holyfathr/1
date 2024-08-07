import clsx from "clsx"
import Image from "next/image"

import Card from "components/ui/Card"

import styles from "./education-level-card.module.scss"

const EducationLevelCard = ({
  illustration,
  title,
  description,
  className,
  ...props
}) => {
  className = clsx(styles.card, className)

  return (
    <Card className={className} {...props}>
      <Image
        src={`/images/illustrations/${illustration}.svg`}
        width={100}
        height={100}
        alt=""
      />
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
    </Card>
  )
}

export default EducationLevelCard
