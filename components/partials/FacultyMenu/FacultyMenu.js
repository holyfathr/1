import Menu from "components/partials/Menu"
import LogoutButton from "components/ui/LogoutButton"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

const FacultyMenu = () => {
  const { data: faculty } = useDefinedQuery(keys.account.faculty)

  return (
    <Menu>
      <Menu.Link href="/pro/faculty/applications/">Заявки</Menu.Link>
      <Menu.Link href="/pro/faculty/analytics/">Аналитика</Menu.Link>
      {faculty?.visible && (
        <Menu.Link href={`/faculties/${faculty.id}/`}>Просмотреть</Menu.Link>
      )}
      <Menu.Link href="/pro/faculty/profile/">Редактировать</Menu.Link>
      <LogoutButton href="/logout/" />
    </Menu>
  )
}

export default FacultyMenu
