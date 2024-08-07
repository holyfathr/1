import clsx from "clsx"
import Link from "next/link"
import { useTranslation } from "next-i18next"

import Icon from "components/ui/Icon"
import Splitter from "components/ui/Splitter"

import styles from "./social-login.module.scss"

const SocialLogin = ({ className, children, ...props }) => {
  const { t } = useTranslation("login")
  className = clsx(styles.login, className)

  return (
    <div className={className} {...props}>
      <Splitter>{t("socialSigIn")}</Splitter>
      <div className={styles.items}>{children}</div>
    </div>
  )
}

const Item = ({ className, icon, href, ...props }) => {
  className = clsx(styles.item, className)

  return (
    <Link href={href}>
      <a className={className} {...props}>
        <Icon slug={icon} className={styles.icon} />
      </a>
    </Link>
  )
}

SocialLogin.Item = Item

export default SocialLogin
