const todayTimestamp = new Date().setHours(0, 0, 0, 0);
import jmoment from 'moment-jalaali';

export const isCurrentDay = (timestamp: number): boolean => {
  return timestamp === new Date(todayTimestamp).setHours(0, 0, 0, 0);
};

export const isEqualDays = (
  first: number | null | undefined | Date,
  second: number | null | undefined | Date
): boolean => {
  if (!first || !second) return false;
  return (
    new Date(first).setHours(0, 0, 0, 0) ===
    new Date(second).setHours(0, 0, 0, 0)
  );
};

export const getFirstDayIndexInMonth = (
  year: number,
  month: number,
  locale: 'fa' | 'en'
): number => {
  const dayName =
    locale === 'en'
      ? // months are zero based so we plus one for month
        jmoment(`${year}, ${month + 1}, 1`).format('ddd')
      : jmoment(`${year}, ${month + 1}, 1`, 'jYYYY=jMM-jDD').format('ddd');
  const dayOrder =
    locale === 'fa'
      ? ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayOrder.indexOf(dayName);
};

export const getNumberOfDays = (
  year: number,
  month: number,
  locale: 'fa' | 'en'
) => {
  if (locale === 'en') {
    return 40 - new Date(year, month, 40).getDate();
  } else {
    return jmoment.jDaysInMonth(year, month);
  }
};
