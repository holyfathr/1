import { useMediaQuery } from "react-responsive"

import DesktopEntrantMenu from "./desktop/"
import MobileEntrantMenu from "./mobile/"

const EntrantMenu = () => {
  const isDesktop = useMediaQuery({ minWidth: 750 })

  return isDesktop ? <DesktopEntrantMenu /> : <MobileEntrantMenu />
}

export default EntrantMenu
