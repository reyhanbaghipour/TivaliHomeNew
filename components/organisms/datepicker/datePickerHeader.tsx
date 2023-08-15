import React from 'react';
import styles from './datepicker.module.css';
import classNames from 'classnames';
import { PmonthMap, monthMap } from './constants';

interface CalendarHeaderProps {
  setMonth: (offset: 1 | -1) => void;
  year: number;
  month: number;
  doubleMonth: boolean;
  locale: 'en' | 'fa';
}

const DatePickerHeader: React.FC<CalendarHeaderProps> = ({
  setMonth,
  year,
  month,
  doubleMonth,
  locale,
}) => {
  const currentMonth = locale === 'fa' ? PmonthMap[month] : monthMap[month];
  const nextMonth =
    locale === 'fa'
      ? PmonthMap[month === 11 ? 0 : month + 1]
      : monthMap[month === 11 ? 0 : month + 1];

  return (
    <div
      className={styles['calendar__header']}
      style={{
        gap: doubleMonth ? '1rem' : 0,
        flexDirection: locale === 'fa' ? 'row' : 'row-reverse',
      }}
    >
      <div
        className={classNames(styles['calendar-header__previous'])}
        onClick={() => (locale === 'fa' ? setMonth(+1) : setMonth(-1))}
      >
        <i className='fi fi-rr-angle-left text-sm flex'></i>
      </div>
      <div>
        <span style={{ marginLeft: '.5rem' }}>{year}</span>
        <span>{currentMonth}</span>
      </div>
      {doubleMonth && (
        <div className={styles['calendar-header__navigation']}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ marginLeft: '.5rem' }}>
              {month === 11 ? year + 1 : year}
            </span>
            <span>{nextMonth}</span>
          </div>
        </div>
      )}
      <div
        className={classNames(styles['calendar-header__next'])}
        onClick={() => (locale === 'fa' ? setMonth(-1) : setMonth(1))}
      >
        <i className='fi fi-rr-angle-right text-sm flex'></i>
      </div>
    </div>
  );
};

export default DatePickerHeader;
