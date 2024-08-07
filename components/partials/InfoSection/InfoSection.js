import clsx from "clsx"
import Image from "next/image"
import { useTranslation } from "next-i18next"

import Wrapper from "components/ui/Wrapper"
import Section from "components/partials/Section"

import styles from "./info-section.module.scss"

const InfoSection = ({ children, className, ...props }) => {
  const { t } = useTranslation("index.page")

  className = clsx(styles.section, className)

  return (
    <Section className={className} isRounded {...props}>
      <Wrapper className={styles.grid}>
        <InfoBlock title={t("infoSection.step1.title")} step={1} illustration="sign-up">
          {t("infoSection.step1.description")}
        </InfoBlock>

        <InfoBlock title={t("infoSection.step2.title")} step={2} illustration="levers">
          {t("infoSection.step2.description")}
        </InfoBlock>

        <InfoBlock title={t("infoSection.step3.title")} step={3} illustration="letter">
          {t("infoSection.step3.description")}
        </InfoBlock>

        <InfoBlock title={t("infoSection.step4.title")} step={4} illustration="done">
          {t("infoSection.step4.description")}
        </InfoBlock>
      </Wrapper>
    </Section>
  )
}

const InfoBlock = ({ step, title, illustration, children }) => {
  const { t } = useTranslation("common")

  return (
    <div className={styles.infoBlock}>
      <div className={styles.content}>
        <div className={styles.step}>
          {t("step")} {step}
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{children}</div>
      </div>
      <div className={styles.illustrationWrapper}>
        <Image src={`/images/illustrations/${illustration}.svg`} layout="fill" alt="" />
      </div>
    </div>
  )
}

export default InfoSection