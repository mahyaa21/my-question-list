import React, { useMemo } from 'react';
import DatePicker from 'react-datepicker2';
import moment from 'moment';
import momentJalaali from 'moment-jalaali';
import style from './datePickerWrapper.scss';
import Calendar from '../../../static/icon/calendar';

momentJalaali.loadPersian({ dialect: 'persian-modern' });
interface DatePickerWrapperInterface {
  label: string;
  onChange: (e) => void;
  dateValue: any;
  isRequired?: boolean;
  onBlur?: any;
}
const DatePickerWrapper = ({
  label,
  onChange,
  dateValue,
  isRequired,
  onBlur
}: DatePickerWrapperInterface) => {
  const datePickerOnchange = (value) => {
    const newTimeStamp = new Date(moment(value).format('YYYY/M/D')).getTime();
    onChange(newTimeStamp);
  };

  function checkDateValueValidation() {
    if ((dateValue && dateValue > 73800000) || dateValue < 0) {
      return true;
    } else {
      return false;
    }
  }

  const date = useMemo(() => {
    if (checkDateValueValidation()) {
      return new Date(dateValue);
    } else {
      return new Date(Date.now());
    }
  }, [dateValue]);

  return (
    <>
      <div className={style.datePickerContainer}>
        <div className={style.dateTitle}>
          {isRequired ? '*' : ''}
          {label}
        </div>
        <div className={style.datePickerWrapper}>
          <DatePicker
            isGregorian={false}
            onChange={(value) => datePickerOnchange(value)}
            value={momentJalaali(date)}
            timePicker={false}
            onBlur={onBlur}
          />
          <Calendar />
        </div>
      </div>
    </>
  );
};

export default DatePickerWrapper;
