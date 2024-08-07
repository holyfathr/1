import clsx from "clsx"

import Wrapper from "components/ui/Wrapper"
import Logo from "components/partials/Logo"
import GuestMenu from "components/partials/GuestMenu"
import EntrantMenu from "components/partials/EntrantMenu"
import FacultyMenu from "components/partials/FacultyMenu"
import UniversityMenu from "components/partials/UniversityMenu"
import AdminMenu from "components/partials/AdminMenu"
import ProGuestMenu from "components/partials/ProGuestMenu"
import LanguageSwitcher from "components/ui/LanguageSwitcher"

import useDefinedQuery, { keys } from "hooks/use-defined-query"
import useIsPro from "hooks/use-is-pro"

import styles from "./header.module.scss"

const Header = ({ flat, className, ...props }) => {
  const { data: account } = useDefinedQuery(keys.account)
  const isPro = useIsPro()

  className = clsx(styles.header, flat && styles.flat, className)

  return (
    <header className={className} {...props}>
      <Wrapper className={styles.content}>
        <div className={styles.navbar}>
          <Logo isPro={isPro} className={styles.logo} />
          {!account?.role && (isPro ? <ProGuestMenu /> : <GuestMenu />)}
          {account?.role === "E" && <EntrantMenu />}
          {account?.role === "F" && <FacultyMenu />}
          {account?.role === "U" && <UniversityMenu />}
          {account?.role === "A" && <AdminMenu />}
        </div>

        {/* <LanguageSwitcher /> */}
      </Wrapper>
    </header>
  )
}

export default Header
