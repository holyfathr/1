// Qualify.js
import React, { useState, useMemo, useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";

import Subsection from "components/ui/Subsection";
import Select from "components/ui/Select";
import Label from "components/ui/Label";
import TextArea from "components/ui/TextArea";
import TestSubjs from './Testing';

import styles from "../program-form.module.scss";

const Qualify = () => {
  const { control, register, getValues, setValue, formState } = useFormContext();
  const [selectedOption, setSelectedOption] = useState(null);

  const types = useMemo(() => [
    { value: "T", label: "Тестирование" },
    { value: "I", label: "Собеседование" },
    { value: "P", label: "Конкурс портфолио" },
    { value: "N", label: "Без вступительных испытания" }
  ], []);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setValue("dvis[0].type", value);
    if (value === "N") {
      setValue("dvis[0].description", " ");
    } else {
      setValue("dvis[0].description", getValues("dvis[0].description") || "");
    }
    if (value === "T") {
      setValue("dvis[0].exams", []);
    }
  };

  useEffect(() => {
    if (selectedOption === "T") {
      const useTesting = getValues("use_testing") || [];
      const examsArray = useTesting.flat().map(subj => subj.use);
      setValue("dvis[0].exams", examsArray);
    }
  }, [selectedOption, getValues, setValue]);

  const renderConditionalBlock = useMemo(() => {
    if (selectedOption === "T") {
      return <TestSubjs />;
    }

    if (selectedOption === "I" || selectedOption === "P") {
      return (
        <Label
          title="Описание формата (до 500 символов)*"
          hasError={formState.errors?.dvis?.[0]?.description}
        >
          <TextArea
            {...register("dvis[0].description")}
            maxLength={500}
          />
        </Label>
      );
    }

    return null;
  }, [selectedOption, formState.errors, register]);

  return (
    <Subsection title="Вступительные испытания" contentClassName={styles.testing}>
      <div className={styles.information}>
        <Label title="Выберите квалификацию">
          <Controller
            name="dvis[0].type"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Выберите из списка"
                options={types}
                valueKey="value"
                labelKey="label"
                onChange={(value) => {
                  handleSelectChange(value);
                  field.onChange(value);
                }}
                value={field.value}
              />
            )}
          />
        </Label>
      </div>

      <div>
        {renderConditionalBlock}
      </div>
    </Subsection>
  );
};

export default React.memo(Qualify);
