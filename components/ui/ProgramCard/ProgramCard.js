import clsx from "clsx"
import Link from "next/link"
import { forwardRef } from "react"
import { useTranslation } from "next-i18next"

import ActionButton from "components/ui/ActionButton"
import Card from "components/ui/Card"
import FavouriteContainer from "components/containers/FavouriteContainer"
import ProgramStats from "components/ui/ProgramStats"
import ProgramBreadcrumbs from "components/partials/ProgramBreadcrumbs"

import styles from "./program-card.module.scss"

const ProgramCard = ({ program, children, className,  showFooter = true, noneShadow, ...props }, ref) => {
  const { t } = useTranslation('stat-card')
  className = clsx(!noneShadow ? styles.card : styles.cardNoneShad, className)

  console.log(program)

  return (
    <Card className={className} {...props} ref={ref}>
      <div className={styles.header}>
        <FavouriteContainer className={styles.favourite} program={program} />

        <ProgramBreadcrumbs program={program} className={styles.breadcrumbs} />

        <h2>
          <Link href={`/programs/${program.id}`}>
            <a className={styles.title} target="_blank">
              {program.title}
            </a>
          </Link>
        </h2>

        <ProgramStats program={program} />
      </div>
      {showFooter && (
        <div className={styles.footer}>
          <ActionButton icon="arrow-right" href={`/programs/${program.id}`} target="_blank">
            {t("cardButton")}
          </ActionButton>
        </div>
      )}
    </Card>
  )
}

export default forwardRef(ProgramCard)
