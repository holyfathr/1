import Menu from "components/partials/Menu"
import LogoutButton from "components/ui/LogoutButton"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

const UniversityMenu = () => {
  const { data: university } = useDefinedQuery(keys.account.university)

  return (
    <Menu>
      {/* <Menu.Link href="/pro/university/analytics/">Аналитика</Menu.Link> */}
      {university?.visible && (
        <Menu.Link href={`/universities/${university.id}/`}>Просмотреть</Menu.Link>
      )}
      <Menu.Link href="/pro/university/profile/">Редактировать</Menu.Link>
      <LogoutButton href="/logout/" />
    </Menu>
  )
}

export default UniversityMenu
