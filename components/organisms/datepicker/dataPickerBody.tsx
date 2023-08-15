import styles from './datepicker.module.css';
import classNames from 'classnames';

interface CalendarProps {
  year: number;
  month: number;
  renderMonthBody: (year: number, month: number) => React.ReactNode;
  locale: 'fa' | 'en';
  doubleMonth: boolean;
}

const DataPickerBody: React.FC<CalendarProps> = ({
  year,
  month,
  renderMonthBody,
  locale,
  doubleMonth,
}) => {
  return (
    <div
      className={styles['datepicker_body']}
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: locale === 'fa' ? 'row' : 'row-reverse',
        flexWrap: 'wrap',
      }}
    >
      <div className={styles['calendar__desktop']}>
        {renderMonthBody(year, month)}
      </div>
      {doubleMonth && (
        <div className={classNames(styles['calendar__desktop'])}>
          {renderMonthBody(
            month === 11 ? year + 1 : year,
            month === 11 ? 0 : month + 1
          )}
        </div>
      )}
    </div>
  );
};

export default DataPickerBody;
