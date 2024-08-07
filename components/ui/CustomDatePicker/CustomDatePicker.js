// components/DatePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import styles from './custom-date-picker.module.scss';
import { forwardRef } from 'react';


// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <input
    className={styles.customInput}
    type="text"
    value={value}
    onClick={onClick}
    readOnly
    ref={ref}
  />
));

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-01-10T12:00:00'));

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.datePickerContainer}>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        showTimeSelect
        dateFormat="dd MMMM yyyy в HH:mm"
        timeFormat="HH:mm"
        timeIntervals={15}
        customInput={<CustomInput />}
        className={styles.picker}
        popperClassName={styles.popper}
      />
    </div>
  );
};

export default CustomDatePicker;
