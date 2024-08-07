import clsx from "clsx"
import { useEffect, useState } from "react"
import { useThrottledCallback } from "use-debounce"
import { useTranslation } from "next-i18next"

import Wrapper from "components/ui/Wrapper"
import Section from "components/partials/Section"
import Icon from "components/ui/Icon"

import styles from "./intro-section.module.scss"

const IntroSection = ({ className, ...props }) => {
  const { t } = useTranslation("index.page")
  const [phrases, setPhrases] = useState(null)

  const onScroll = () => {
    if (!phrases) return

    const viewportCenter = window.scrollY + window.innerHeight / 2

    let activePhraseIndex
    for (let i = 0; i < phrases.length; i++) {
      const phrase = phrases[i]
      const phraseOffsetTop =
        phrase.getBoundingClientRect().top +
        window.scrollY -
        document.documentElement.clientTop

      if (phraseOffsetTop < viewportCenter) {
        activePhraseIndex = i
      }
      phrase.classList.remove(styles.active)
    }

    activePhraseIndex >= 0 && phrases[activePhraseIndex].classList.add(styles.active)
  }

  const throttledOnScroll = useThrottledCallback(onScroll, 100)

  useEffect(() => {
    setPhrases(document.body.getElementsByClassName(styles.phrase))
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", throttledOnScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledOnScroll)
  }, [throttledOnScroll])

  className = clsx(styles.section, className)

  return (
    <Section isRounded className={className} {...props}>
      <Wrapper className={styles.wrapper}>
        <div className={styles.scrollDown}>
          <span>{t("introSection.scrollDown")}</span>
          <Icon className={styles.mouse} slug="mouse" />
        </div>
        <p>
          <Phrase>
            {t("introSection.almaterIs")}
            <br />
            {t("introSection.centralized")}
          </Phrase>
        </p>
        <p>
          <Phrase>{t("introSection.catalog")}</Phrase>
          <br />
          <Phrase>{t("introSection.application")}</Phrase>
          <br />
          <Phrase>{t("introSection.tracking")}</Phrase>
          <br />
          <Phrase>{t("introSection.time")}</Phrase>
          <br />
          <Phrase>{t("introSection.reliability")}</Phrase>
        </p>
        <p>
          <Phrase>{t("introSection.needs")}</Phrase>{" "}
          <Phrase>{t("introSection.way")}</Phrase>
        </p>
        <Phrase>{t("introSection.learnMore")}</Phrase>
      </Wrapper>
    </Section>
  )
}

const Phrase = ({ children }) => {
  return <span className={styles.phrase}>{children}</span>
}

export default IntroSection