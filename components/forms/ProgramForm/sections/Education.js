import { Controller, useFormContext } from "react-hook-form";

import PriceInput from "components/proxies/PriceInput";
import Label from "components/ui/Label";
import Select from "components/ui/Select";
import Subsection from "components/ui/Subsection";
import Input from "components/ui/Input";
import DateInput from "components/ui/DateInput";

import useDefinedQuery, { keys } from "hooks/use-defined-query";

import styles from "../program-form.module.scss";

const Education = () => {
  const { control, register, formState } = useFormContext();

  const { data: languages, isLoading: isLanguagesLoading } = useDefinedQuery(keys.languages);
  const { data: durations, isLoading: isDurationsLoading } = useDefinedQuery(keys.durations);

  return (
    <Subsection title="Обучение" contentClassName={styles.information}>
      <Label title="Продолжительность обучения*" hasError={formState.errors.duration}>
        <Controller
          control={control}
          name="duration"
          render={({ field }) => (
            <Select
              placeholder={isDurationsLoading ? "Загрузка..." : "Выберите"}
              options={durations}
              disabled={isDurationsLoading}
              hasError={formState.errors.duration}
              variant="thin"
              {...field}
            />
          )}
        />
      </Label>

      <Label title="Стоимость коммерции (в рублях)*" hasError={formState.errors.commerce_cost}>
        <Controller
          name="commerce_cost"
          control={control}
          render={({ field }) => (
            <PriceInput hasError={formState.errors.commerce_cost} {...field} placeholder="от X,XXX,XXX"/>
          )}
        />
      </Label>

      <Label title="Язык обучения" hasError={formState.errors.languages}>
        <Controller
          control={control}
          name="languages"
          render={({ field }) => (
            <Select
              placeholder={isLanguagesLoading ? "Загрузка..." : "Выберите"}
              multiple
              options={languages}
              valueKey="id"
              disabled={isLanguagesLoading}
              labelKey="russian_title"
              hasError={formState.errors.languages}
              variant="thin"
              {...field}
            />
          )}
        />
      </Label>

      <Label
        title="Ссылка на сайт образовательной программы"
        className={styles.url}
        hasError={formState.errors.link_to_university_info}
      >
        <Input {...register("link_to_university_info")} type="url" />
      </Label>

      <Label
        title="Дата завершения приема документов*"
        hasError={formState.errors.closing_date}
      >
        <Controller 
          control={control}
          name="closing_date"
          render={({field}) => (
            <DateInput
              hasError={formState.errors.closing_date}
              {...field}
            />
          )}
        />
      </Label>
    </Subsection>
  );
}

export default Education;
