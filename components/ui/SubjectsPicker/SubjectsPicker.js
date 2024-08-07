import Select from "components/ui/Select";

import useDefinedQuery, { keys } from "hooks/use-defined-query";

const SubjectsPicker = ({ value, onChange, ...props }) => {
  const { data: subjects, isLoading } = useDefinedQuery(keys.subjects);

  return (
    <Select
      placeholder={isLoading ? "Загрузка..." : "Выбор ЕГЭ"}
      disabled={isLoading}
      options={subjects}
      value={value.map((v) => v.id)}
      onChange={(ids) => onChange(ids.map((id) => subjects.find((s) => s.id === id)))}
      multiple
      labelKey="exam_title"
      valueKey="id"
      dynamicPlaceholder={false}
      {...props}
    />
  );
};

export default SubjectsPicker;
