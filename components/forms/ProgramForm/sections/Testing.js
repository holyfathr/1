import { useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import ResultsInput from "components/ui/ResultsInput";
import ActionButton from "components/ui/ActionButton";
import SubjectsPicker from "components/ui/SubjectsPicker";

import { renameKeys } from "helpers/objects";

import styles from "../program-form.module.scss";

const TestSubjs = () => {
  const { control, setValue, getValues } = useFormContext();
  const {
    fields: thresholds,
    append,
    remove,
  } = useFieldArray({ name: "use_testing", control });

  const [pickerVisibleIndex, setPickerVisibleIndex] = useState(null);

  const handleActionButton = () => {
    append();
    setPickerVisibleIndex(thresholds.length);
  };

  const handlePickerChange = (newSubjects, index) => {
    const updatedSubjects = getValues("use_testing");
    updatedSubjects[index] = newSubjects.map(subj => renameKeys(subj, { id: "use", exam_title: "use_title" }));
    setValue(`use_testing`, updatedSubjects);
    
    const examsArray = updatedSubjects.flat().map(subj => subj.use);
    setValue("dvi[0].exams", examsArray);
    
    console.log(examsArray)

    setPickerVisibleIndex(null);
  };

  return (
    <div className={styles.threshold}>
      {thresholds.map((threshold, index) => (
        <TestSubj
          index={index}
          key={threshold.id}
          onDelete={remove}
          pickerVisible={pickerVisibleIndex === index}
          onPickerChange={handlePickerChange}
          setPickerVisibleIndex={setPickerVisibleIndex}
        />
      ))}

      <ActionButton icon="plus" variant="accent" onClick={handleActionButton}>
        Добавить
      </ActionButton>
    </div>
  );
};

const TestSubj = ({ index, onDelete, pickerVisible, onPickerChange, setPickerVisibleIndex }) => {
  const { control, getValues } = useFormContext();

  const [subjects, setSubjects] = useState(() => {
    const threshold = getValues(`use_testing.${index}`) || [];
    return threshold.map((t) => renameKeys(t, { use: "id", use_title: "exam_title" }));
  });

  const onResultDelete = (deletedIndex) => {
    const newSubjects = subjects.filter((_, i) => i !== deletedIndex);
    if (newSubjects.length === 0) return onDelete(index);
    setSubjects(newSubjects);
    onPickerChange(newSubjects, index);
  };

  const handleSubjectsChange = (newSubjects) => {
    setSubjects(newSubjects);
    onPickerChange(newSubjects, index);
  };

  useEffect(() => {
    if (pickerVisible) {
      setPickerVisibleIndex(index);
    }
  }, [pickerVisible, index, setPickerVisibleIndex]);

  return (
    <div className={styles.threshold}>
      {pickerVisible && (
        <SubjectsPicker
          value={subjects}
          onChange={handleSubjectsChange}
          className={styles.subjects}
        />
      )}
      <Controller
        control={control}
        name={`use_testing.${index}`}
        defaultValue={[]}
        render={({ field }) => (
          <ResultsInput
            subjects={subjects}
            idKey="use"
            valueKey="use_testing"
            isInt={false}
            onDelete={onResultDelete}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default TestSubjs;
