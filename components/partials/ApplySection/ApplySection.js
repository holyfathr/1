import clsx from "clsx"
import Link from "next/link"
import { useMediaQuery } from "react-responsive"
import { useTranslation } from "next-i18next"

import SnapPicker from "components/proxies/SnapPicker"
import Wrapper from "components/ui/Wrapper"
import HeroSection from "components/partials/HeroSection"

import styles from "./apply-section.module.scss"

const ApplySection = ({ className, ...props }) => {
  const { t } = useTranslation("index.page")
  const { t: tC } = useTranslation("common")
  const isDesktop = useMediaQuery({ minWidth: styles.breakpoint })

  className = clsx(styles.section, className)

  return (
    <HeroSection className={className} isRounded {...props}>
      <Wrapper className={styles.wrapper}>
        <div className={styles.left}>
          <p>{t("applySection.become")}</p>

          <SnapPicker
            options={{ height: isDesktop ? "30rem" : "5rem", perPage: isDesktop ? 7 : 1 }}
            className={styles.picker}
          >
            <SnapPicker.Item className={styles.item}>
              {t("applySection.engineer")}
            </SnapPicker.Item>
            <SnapPicker.Item className={styles.item}>
              {t("applySection.programmer")}
            </SnapPicker.Item>
            <SnapPicker.Item className={styles.item}>
              {t("applySection.agronomist")}
            </SnapPicker.Item>
            <SnapPicker.Item className={styles.item}>
              {t("applySection.designer")}
            </SnapPicker.Item>
            <SnapPicker.Item className={styles.item}>
              {t("applySection.economist")}
            </SnapPicker.Item>
            <SnapPicker.Item className={styles.item}>
              {t("applySection.diplomat")}
            </SnapPicker.Item>
            <SnapPicker.Item className={styles.item}>
              {t("applySection.teacher")}
            </SnapPicker.Item>
          </SnapPicker>
        </div>

        <Link href="/login/">
          <a className={styles.link}>{tC("tryNow")}</a>
        </Link>
      </Wrapper>
    </HeroSection>
  )
}

export default ApplySection