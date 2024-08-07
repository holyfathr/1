import { useRouter } from "next/router"

import Table from "components/proxies/Table"

import { formatName, formatDateString } from "helpers/language"

const ApplicationsTable = ({ program, applications }) => {
  const router = useRouter()

  const onRowClick = (application) => {
    router.push(`/pro/faculty/applications/${application.application_id}/`)
  }

  const columns=[
    { title: "№",
      dataIndex: "number",
      key: "number",
      width: 56
    },
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
      render: (_,row) => formatDateString(row.date),
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
