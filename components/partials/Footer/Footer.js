import clsx from "clsx"
import Link from "next/link"
import { useTranslation } from "next-i18next"

import Wrapper from "components/ui/Wrapper"
import Logo from "components/partials/Logo"

import styles from "./footer.module.scss"

const Footer = ({ className, ...props }) => {
  const { t } = useTranslation("index.page")

  className = clsx(styles.footer, className)

  return (
    <footer className={className} {...props}>
      <Wrapper className={styles.wrapper}>
        <div className={styles.almatera}>
          <Logo className={styles.logo}/>
          <span>© Almater 2024</span>
        </div>
        <div className={styles.email}>
          <Link href="mailto:info@almater.io">
            <a className={styles.link}>info@almater.io</a>
          </Link>
        </div>
        <div className={styles.policies}>
          <Link href="/policy/">
            <a className={styles.link}>{t("footer.privacyPolicy")}</a>
          </Link>
          <Link href="/agreement/">
            <a className={styles.link}>{t("footer.userAgreement")}</a>
          </Link>
          <Link href="/faq/">
            <a className={styles.link}>FAQ</a>
          </Link>
        </div>
      </Wrapper>
    </footer>
  )
}

export default Footer