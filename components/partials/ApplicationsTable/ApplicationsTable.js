import { useRouter } from "next/router"
import flatten from "lodash/flatten"
import uniqBy from "lodash/uniqBy"

import Table from "components/proxies/Table"
import FullWidthScrollLine from "components/ui/FullWidthScrollLine"

import { formatName } from "helpers/language"
import { getTrainingFormTitle } from "helpers/enums"
import Subsection from "components/ui/Subsection"
import Select from "components/ui/Select"

const ApplicationsTable = ({ program, applications, ...props }) => {
  const router = useRouter()

  const onRowClick = (application) => {
    router.push(`/pro/faculty/applications/${application.application_id}/`)
  }

  const columns=[
    { title: "№", dataIndex: "id", key: "id", width: 56 },
    {
      title: "ФИО",
      dataIndex: "name",
      key: "name",
      render: (_, row) => formatName(row.name, row.surname, row.middle_name),
      width: 380,
    },
    {
      title: "Дата заявки",
      dataIndex:"date",
      key:"date",
      width: 94,
    },
    {
      title:"Приоритет вуза",
      dataIndex:"priority",
      key:"priority",
      width: 98,
    },
    {
      title:"Страна",
      dataIndex:"citizenship",
      key:"citizenship",
      width: 164,
    },
    {
      title:"Статус от вуза",
      dataIndex:"university_status",
      key:"university_status",
      width: 167,
    },
    {
      title:"Статус от абитуриента",
      dataIndex:"entrant_status",
      key:"entrant_status",
      width: 167,
    },
  ]

  return (
    <Table
      rowKey="id"
      onRow={(row) => ({
          onClick: () => onRowClick(row),
          style: { cursor: "pointer" },
        })}
      columns={columns}
      data={applications}
    />
  )
}

export default ApplicationsTable
