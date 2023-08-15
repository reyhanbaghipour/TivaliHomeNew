import React, { useState, memo, useCallback, ReactNode } from 'react';
import DataPickerBody from './dataPickerBody';
import jmoment from 'moment-jalaali';
import classNames from 'classnames';
import styles from './datepicker.module.css';
import {
  getFirstDayIndexInMonth,
  getNumberOfDays,
  isEqualDays,
} from './helper';
import DatePickerHeader from './datePickerHeader';

const todayTimestamp = new Date().setHours(0, 0, 0, 0);
const today = jmoment();

interface Props {
  onChange: (startDate: number | null, endDate: number | null) => void;
  type?: 'range' | 'single';
  doubleMonth?: boolean;
  startDate?: null | number;
  endDate?: null | number;
  view: 'desktop' | 'mobile';
  locale?: 'fa' | 'en';
  disablePreviousDays?: boolean;
  renderDayFn?: (
    day: { timestamp: number; currentMonth: boolean },
    index: number
  ) => ReactNode;
  containerClassName?: string;
}

interface State {
  year: number;
  month: number;
  hoveredDay: null | number;
}

const Calendar: React.FC<Props> = ({
  onChange,
  type = 'single',
  doubleMonth = false,
  startDate,
  endDate,
  view,
  locale = 'en',
  disablePreviousDays = false,
  renderDayFn,
  containerClassName,
}) => {
  const [state, setState] = useState<State>({
    year: locale === 'fa' ? today.jYear() : today.year(),
    month: locale === 'fa' ? today.jMonth() : today.month(),
    hoveredDay: null,
  });

  // const [value, setValue] = useState({ from: null, to: null });

  const getCalendarBlockDetails = (year: number, month: number) => {
    const currentMonthDaysCount = getNumberOfDays(year, month, locale);

    const monthBlockArray = [];
    const offsetFromPrevMonth = getFirstDayIndexInMonth(year, month, locale);
    const offsetFromNextMonth =
      42 - currentMonthDaysCount - offsetFromPrevMonth;

    //adding offset from previous month to the current block
    if (offsetFromPrevMonth > 0) {
      const prevMonthDaysCount =
        month === 1
          ? getNumberOfDays(year - 1, 12, locale)
          : getNumberOfDays(year, month - 1, locale);

      for (let offset = 0; offset < offsetFromPrevMonth; offset++) {
        const dateString = `${month === 0 ? year - 1 : year}/${
          (month === 0 ? 11 : month - 1) + 1
        }/${prevMonthDaysCount - offset}`;

        const date = new Date(
          locale === 'fa'
            ? jmoment(dateString, 'jYYYY-jMM-jDD').format()
            : dateString
        );
        monthBlockArray.push({
          timestamp: date.setHours(0, 0, 0, 0),
          currentMonth: false,
        });
      }
    }

    for (let day = 1; day <= currentMonthDaysCount; day++) {
      const dateString = `${year}/${month + 1}/${day}`;
      const date = new Date(
        locale === 'fa'
          ? jmoment(dateString, 'jYYYY-jMM-jDD').format()
          : dateString
      );
      monthBlockArray.push({
        timestamp: date.setHours(0, 0, 0, 0),
        currentMonth: true,
      });
    }

    //adding offset from next month to the current block
    if (offsetFromNextMonth > 0) {
      for (let offset = 1; offset <= offsetFromNextMonth; offset++) {
        const dateString = `${month === 11 ? year + 1 : year}/${
          month === 11 ? 12 : month + 1
        }/${offset}`;
        const date = new Date(
          locale === 'fa'
            ? jmoment(dateString, 'jYYYY-jMM-jDD').format()
            : dateString
        );
        monthBlockArray.push({
          timestamp: date.setHours(0, 0, 0, 0),
          currentMonth: false,
        });
      }
    }

    return monthBlockArray;
  };

  const setRange = (selectedDay: number): void => {
    if (
      startDate &&
      endDate &&
      startDate === endDate &&
      startDate === selectedDay
    ) {
      setState((prev) => {
        return {
          ...prev,
          hoveredDay: null,
        };
      });
      onChange(null, null);
      return;
    }
    if (!startDate) {
      setState((prev) => {
        return {
          ...prev,
          hoveredDay: selectedDay,
        };
      });
      onChange(selectedDay, null);
    } else {
      if (selectedDay > startDate) {
        if (
          endDate &&
          Math.abs(selectedDay - startDate) < Math.abs(endDate - selectedDay)
        ) {
          setState((prev) => {
            return {
              ...prev,
              selectedDay,
              hoveredDay: selectedDay,
            };
          });
          onChange(selectedDay, endDate);
        } else if (startDate === selectedDay) {
          setState((prev) => {
            return {
              ...prev,
              selectedDay,
              hoveredDay: selectedDay,
            };
          });
          onChange(selectedDay, selectedDay);
        } else {
          setState((prev) => {
            return {
              ...prev,
              hoveredDay: selectedDay,
            };
          });
          onChange(startDate, selectedDay);
        }
      } else if (startDate > selectedDay) {
        setState((prev) => {
          return {
            ...prev,
            selectedDay,
            hoveredDay: selectedDay,
          };
        });
        onChange(selectedDay, null);
      } else if (startDate === selectedDay) {
        setState((prev) => {
          return {
            ...prev,
            selectedDay,
            from: selectedDay,
            to: selectedDay,
            hoveredDay: selectedDay,
          };
        });
        onChange(selectedDay, selectedDay);
      }
    }
  };

  const onDateClick = (timestamp: number): void => {
    if (type === 'range') {
      setRange(timestamp);
    } else {
      onChange(timestamp, null);
    }
  };

  const setMonth = (offset: 1 | -1): void => {
    let year = state.year;
    let month = state.month + offset;
    if (month === -1) {
      month = 11;
      year = year - 1;
    } else if (month === 12) {
      month = 0;
      year = year + 1;
    }
    setState((prev) => {
      return {
        ...prev,
        year,
        month,
      };
    });
  };

  /**
   *  Renderers
   */

  const renderDay = useCallback(
    (
      day: { currentMonth: boolean; timestamp: number },
      index: number
    ): React.ReactNode => {
      const currentDay = jmoment(day.timestamp);

      const isDisabled = day.timestamp < todayTimestamp && disablePreviousDays;
      const isToday = isEqualDays(day.timestamp, todayTimestamp);
      const isSelectedSingleDate =
        isEqualDays(day.timestamp, startDate) && type === 'single';
      const isHoveredDay =
        startDate &&
        !endDate &&
        (state.hoveredDay as number) >= day.timestamp &&
        day.timestamp > startDate;

      const isFromDate =
        isEqualDays(day.timestamp, startDate) && type === 'range';
      const isToDate = type === 'range' && day.timestamp === endDate;
      const isInrange =
        endDate &&
        startDate &&
        day.timestamp > startDate &&
        day.timestamp < endDate;

      return (
        <div
          key={index}
          onMouseOver={
            view === 'desktop'
              ? () => {
                  if (!endDate && state.hoveredDay) {
                    setState((prev) => {
                      return {
                        ...prev,
                        hoveredDay: day.timestamp,
                      };
                    });
                  } else if (endDate && state.hoveredDay) {
                    setState((prev) => {
                      return {
                        ...prev,
                        hoveredDay: day.timestamp,
                      };
                    });
                  }
                }
              : undefined
          }
          className={classNames(
            styles['day'],
            isDisabled && styles['day--disabled'],
            isHoveredDay && styles['day--hovered'],
            isToday && styles['day--today'],
            isSelectedSingleDate && styles['day--selected'],
            isFromDate && styles['day--selected-from'],
            isToDate && styles['day--selected-to'],
            isInrange && styles['day--inRange']
          )}
          style={day.currentMonth ? {} : { opacity: 0 }}
          onClick={() => {
            if (!day.currentMonth) return;
            onDateClick(day.timestamp);
          }}
        >
          <span>
            {locale === 'fa'
              ? currentDay.jDate().toLocaleString('fa')
              : currentDay.date()}
          </span>
        </div>
      );
    },
    [startDate, endDate, state.hoveredDay, type]
  );

  const renderCalendar = (year: number, month: number) => {
    const monthD = getCalendarBlockDetails(year, month);

    const days = monthD.map((day, index) =>
      renderDayFn ? renderDayFn(day, index) : renderDay(day, index)
    );
    const weekNameList =
      locale === 'en'
        ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        : [
            'شنبه',
            'یکشنبه',
            'دوشنبه',
            'سه‌شنبه',
            'چهار‌شنبه',
            'پنجشنبه',
            'جمعه',
          ];

    return (
      <>
        <div
          className={styles['month__header']}
          style={{ flexDirection: locale === 'fa' ? 'row' : 'row-reverse' }}
        >
          {weekNameList.map((dName, i) => (
            <span key={i} className={styles['month__header--item']}>
              {dName}
            </span>
          ))}
        </div>
        <div
          className={styles['month__body']}
          style={{ flexDirection: locale === 'fa' ? 'row' : 'row-reverse' }}
        >
          {days}
        </div>
      </>
    );
  };

  return (
    <div
      className={classNames(styles['calendar__container'], containerClassName)}
    >
      <DatePickerHeader
        year={state.year}
        month={state.month}
        setMonth={setMonth}
        doubleMonth={doubleMonth}
        locale={locale}
      />

      <DataPickerBody
        year={state.year}
        month={state.month}
        renderMonthBody={renderCalendar}
        locale={locale}
        doubleMonth={doubleMonth}
      />
    </div>
  );
};
export default memo(Calendar);
