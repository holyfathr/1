import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import clsx from "clsx";

import Input from "components/ui/Input";
import Label from "components/ui/Label";
import Select from "components/ui/Select";
import DateTimeInput from "components/ui/DateTimeInput";
import Row from "components/ui/Row";

import schema from "validation/event-form";

import styles from "./event-form.module.scss";

const EventForm = ({ programs, defaultValues, buttons, onSubmit, className }) => {
  const { register, handleSubmit, control, formState } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  className = clsx(styles.form, className);

  return (
    <form
      className={className}
      onSubmit={handleSubmit(onSubmit)}
      data-dirty={formState.isDirty}
    >
      <Label title="Дата и время*" hasError={formState.errors.date}>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DateTimeInput hasError={formState.errors.date} time={true} {...field} />
          )}
        />
      </Label>

      <Label title="Адрес*" hasError={formState.errors.address}>
        <Input {...register("address")} />
      </Label>

      <Label title="Описание*" hasError={formState.errors.description}>
        <Input {...register("description")} />
      </Label>

      {programs.length > 0 && (
        <Label title="Список программ (опционально)">
          <Controller
            control={control}
            name="educational_program"
            render={({ field }) => (
              <Select
                options={programs}
                placeholder="Можете выбрать несколько"
                multiple
                valueKey="id"
                labelKey="title"
                variant="thin"
                {...field}
              />
            )}
          />
        </Label>
      )}

      <Label title="Ссылка на виртуальную встречу (опционально)" hasError={formState.errors.virtual_meeting}>
        <Input {...register("virtual_meeting")} />
      </Label>

      {buttons && <Row>{buttons}</Row>}
    </form>
  );
};

export default EventForm;
