import ColumnDiagram from "components/ui/ColumnDiagram"

const COLORS = ["#1E60F6", "#4880FF", "#79A2FF", "#A5C0FF", "#CC623E"]

const CitizenshipDiagram = ({ citizenships, totalCount }) => {
  if (totalCount === 0 || !Array.isArray(citizenships)) return "Нет данных"

  return (
    <ColumnDiagram
      maxColumns={5}
      data={citizenships.map((entry, index) => ({
        percentage: (entry.count / totalCount) * 100,
        title: entry.citizenship,
        color: COLORS[index % COLORS.length],
      }))}
    />
  )
}

export default CitizenshipDiagram
