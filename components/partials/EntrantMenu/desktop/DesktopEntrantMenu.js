import Menu from "components/partials/Menu"
import EntrantPreview from "components/ui/EntrantPreview"
import LogoutButton from "components/ui/LogoutButton"

import { useTranslation } from "next-i18next";

import useDefinedQuery, { keys } from "hooks/use-defined-query"

const DesktopEntrantMenu = () => {
  const { t } = useTranslation("header");
  const { data: entrant, isSuccess } = useDefinedQuery(keys.account.entrant);

  return (
    <Menu>
      <Menu.Link href="/search/">Поиск</Menu.Link>
      <Menu.Link href="/applications/">Мои заявки</Menu.Link>
      <Menu.Link href="/favourites/">Избранное</Menu.Link>
      <Menu.Link href="/faq/">FAQ</Menu.Link>
      {isSuccess && <EntrantPreview entrant={entrant} />}
      <LogoutButton href="/logout/" />
    </Menu>
  )
}

export default DesktopEntrantMenu
