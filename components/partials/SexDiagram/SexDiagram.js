import CircleDiagram from "components/ui/CircleDiagram"

const SexDiagram = ({ maleCount = 0, femaleCount = 0, totalCount }) => {
  if (!totalCount) return "Нет данных"

  return (
    <CircleDiagram
      data={[
        {
          percentage: (maleCount / totalCount) * 100,
          title: "Мужчины",
          color: "#1E60F6",
        },
        {
          percentage: (femaleCount / totalCount) * 100,
          title: "Женщины",
          color: "#E5AF9B",
        },
      ]}
    />
  )
}

export default SexDiagram
