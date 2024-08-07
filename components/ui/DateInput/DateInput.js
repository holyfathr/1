import React, { forwardRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import { format, parseISO, isValid } from "date-fns"
import Input from "components/ui/Input";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./date-input.module.scss";

registerLocale("ru", ru);

const DateInput = ({ value, hasError, time, onChange, ...props }, ref) => {

  const handleChange = (date) => {
    if (onChange && !time) {
      onChange(format(date, "yyyy-MM-dd"));
    }
  };

  const isValidDate = (dateString) => {
    const date = parseISO(dateString);
    return isValid(date);
  };

  const formattedValue = value && isValidDate(value) ? format(parseISO(value), "dd MMMM yyyy", { locale: ru }) : '';

  return (
    <>  
      <ReactDatePicker
        customInput={<Input className={styles.input} hasError={hasError} value={formattedValue} />}
        dateFormat="dd MMMM yyyy"
        locale="ru"
        popperClassName={styles.picker}
        selected={value && isValidDate(value) ? parseISO(value) : null}
        autoComplete="off"
        {...props}
        onChange={handleChange}
      />
    </>
  );
};

export default forwardRef(DateInput);
