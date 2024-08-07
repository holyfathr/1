import clsx from "clsx"

import BurgerButton from "components/ui/BurgerButton"
import Sidebar from "components/ui/Sidebar"

import useScrollLock from "hooks/use-scroll-lock"
import useToggle from "hooks/use-toggle"

import styles from "./mobile-entrant-menu.module.scss"

const MobileEntrantMenu = () => {
  const [visible, toggleVisible] = useToggle(false)

  useScrollLock(visible)

  return (
    <>
      <BurgerButton active={visible} onClick={toggleVisible} />

      <div
        className={clsx(styles.menu, visible && styles.visible)}
        data-scroll-lock-scrollable
      >
        <div className={styles.wrapper}>
          <Sidebar>
            <Sidebar.Link icon="user-outlined" href="/profile/">
              Профиль
            </Sidebar.Link>
            <Sidebar.Link icon="document" href="/applications/">
              Мои заявки
            </Sidebar.Link>
            <Sidebar.Link icon="star-thick" href="/favourites/">
              Избранное
            </Sidebar.Link>
            <Sidebar.Link icon="magnifier" href="/search/">
              Поиск
            </Sidebar.Link>
          </Sidebar>

          <Sidebar className={styles.exit}>
            <Sidebar.Link icon="exit" href="/logout/">
              Выйти
            </Sidebar.Link>
          </Sidebar>
        </div>
      </div>
    </>
  )
}

export default MobileEntrantMenu
