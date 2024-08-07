import React, { forwardRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import { format, formatISO } from "date-fns";
import Input from "components/ui/Input";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./date-input.module.scss";

registerLocale("ru", ru);

const DateTimeInput = ({ value, hasError, time, onChange, ...props }, ref) => {
  const handleChange = (date) => {
    if (onChange) {
      onChange(format(date, "yyyy-MM-dd'T'HH:mm:ssxxx"));
    }
  };

  const formattedValue = value ? format(new Date(value), "dd MMMM yyyy 'в' HH:mm", { locale: ru }) : '';

  return (
    <>      
      <ReactDatePicker
        customInput={<Input className={styles.input} hasError={hasError} value={formattedValue} />}
        showTimeSelect
        dateFormat="dd MMMM yyyy 'в' HH:mm"
        locale="ru"
        timeCaption="Время"
        popperClassName={styles.picker}
        headerClassName={styles.header}
        selected={value ? new Date(value) : null}
        autoComplete="off"
        {...props}
        onChange={handleChange}
        ref={(elem) => elem && ref(elem.input)}
      />
    </>
  );
};

export default forwardRef(DateTimeInput);
