import { forwardRef, useEffect, useState } from "react";
import find from "lodash/find";
import unionBy from "lodash/unionBy";

import InputsCloud from "components/ui/InputsCloud";
import IntegerInput from "components/ui/IntegerInput";
import { useFormContext, useFormState } from "react-hook-form";
import SubjInput from "../SubjInput";

const ResultsInput = (
  {
    subjects,
    className,
    value: results,
    idKey = "id",
    valueKey = "value",
    onChange,
    onDelete,
    readOnly,
    isInt,
    ...props
  },
  ref
) => {
  const { setValue } = useFormContext();
  const [isInteger, setIsInteger] = useState();
  const getCurrentResult = (subject) => {
    return find(results, [idKey, subject.id]);
  };

  const syncResults = () => {
    const newResults = subjects.map((subject) => {
      const currentResult = getCurrentResult(subject);
      return currentResult || { [idKey]: subject.id, [valueKey]: 0 };
    });

    setValue("exam", newResults);
  };

  const onResultChange = ({ target }) => {
    const newResult = {
      [idKey]: +target.dataset.subjectId,
      [valueKey]: +target.value,
    };

    const newResults = unionBy([newResult], results, idKey);
    onChange(newResults);
  };

  useEffect(() => {
    isInt === undefined ? setIsInteger(true) : setIsInteger(isInt);
    syncResults();
  }, [subjects]);

  return (
    <InputsCloud {...props} ref={ref}>
      {subjects.map((subject, index) => {
        if (isInteger === true)  
          return (
            <IntegerInput
              min={1}
              max={100}
              title={subject.exam_title}
              key={subject.id}
              onChange={onResultChange}
              value={getCurrentResult(subject)?.[valueKey] || ""}
              onDelete={onDelete ? () => onDelete(index) : undefined}
              data-subject-id={subject.id}
              readOnly={readOnly}
            />
          )
        else
          return (
            <SubjInput
              title={subject.exam_title}
              key={subject.id}
              onDelete={onDelete ? () => onDelete(index) : undefined}
              data-subject-id={subject.id}
              readOnly={readOnly}
            />
          );
      })}
    </InputsCloud>
  );
};

export default forwardRef(ResultsInput);
