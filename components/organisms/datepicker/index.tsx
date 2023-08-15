import { useState, useEffect, FC, ReactNode } from 'react';
import Calendar from './Calendar';
import { usePopper } from 'react-popper';
import classNames from 'classnames';
import { Button } from 'antd';

interface Props {
  onChange: (value: { from: Date; to?: Date }) => void;
  value?: { from?: Date | number; to?: Date | number };
  inputClassName?: string;
  mode?: 'mobile' | 'desktop';
  type?: 'range' | 'single';
  doubleMonth?: boolean;
  disablePreviousDays?: boolean;
  renderDayFn?: (
    day: { timestamp: number; currentMonth: boolean },
    index: number
  ) => ReactNode;
}

const DatePicker: FC<Props> = ({
  onChange,
  value,
  inputClassName,
  mode = 'desktop',
  type = 'single',
  doubleMonth = false,
  disablePreviousDays = false,
  renderDayFn,
}) => {
  const [date, setDate] = useState<{ from: null | number; to: null | number }>({
    from: value?.from ? new Date(value.from).setHours(0, 0, 0, 0) : null,
    to: value?.to ? new Date(value.to).setHours(0, 0, 0, 0) : null,
  });

  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [confirmed, setConfirmed] = useState({ state: false });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    strategy: 'absolute',
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top'],
          allowedAutoPlacements: ['top', 'bottom'], // by default, all the placements are allowed
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  useEffect(() => {
    if (mode === 'mobile') return;
    const clickOutsideHandler = (e: globalThis.MouseEvent) => {
      if (!referenceElement?.contains(e.target as Node)) {
        setConfirmed({ state: false });
      }
    };
    document.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, [mode]);

  const converDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fa', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const submitDateHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!date.from) return;
    if (type === 'range' && !date.to) return;
    setConfirmed({ state: true });
  };

  useEffect(() => {
    if (!visible) return;
    if (!confirmed.state) {
      setDate({ from: null, to: null });
    } else if (!visible && confirmed.state && date.from) {
      const startDate = new Date(date.from);
      const endDate = date.to ? new Date(date.to) : undefined;
      onChange({ from: startDate, to: endDate });
    }
    setVisible(false);
  }, [confirmed]);

  const startDate = date.from ? converDate(date.from) : '';

  const toDate = date.to ? converDate(date.to) : '';

  return (
    <div
      className={classNames(
        'md:min-w-[340px] w-full h-[3.25rem] border-grey border-[0.031rem] rounded-lg p-4 z-[1000]',
        visible && 'border-primary-1',
        inputClassName
      )}
      onClick={() => setVisible(true)}
      ref={setReferenceElement}
    >
      <div className='absolute left-4 leading-0'>
        <i className='fi fi-rr-calendar text-black-1 text-base leading-0'></i>
      </div>
      <span className='text-sm'>{startDate}</span>
      {type === 'range' && date.to && (
        <>
          <span className='mx-4'>-</span>
          <span className='text-sm'>{toDate}</span>
        </>
      )}
      {visible && mode === 'desktop' ? (
        <div
          ref={setPopperElement}
          {...attributes.popper}
          style={{ ...styles.popper }}
          className={classNames(
            'flex px-9 py-6 border-2 border-primary-1 rounded-lg flex-col justify-center items-center w-full '
          )}
        >
          <Calendar
            view={'desktop'}
            onChange={(from, to) => {
              setDate({ from, to });
            }}
            startDate={date.from}
            endDate={date.to}
            locale='fa'
            disablePreviousDays={disablePreviousDays}
            type={type}
            doubleMonth={doubleMonth}
            renderDayFn={renderDayFn}
          />
          <Button
            className='mt-auto bg-primary-1 text-white h-12 w-full'
            block
            onClick={submitDateHandler}
            disabled={
              (type === 'range' && (!date.from || !date.to)) ||
              (type === 'single' && !date.from)
            }
          >
            ثبت
          </Button>
        </div>
      ) : visible && mode === 'mobile' ? (
        <div className='flex flex-col items-center fixed top-0 right-0 left-0 bottom-0 bg-white p-6 z-[1000]'>
          <Button
            style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)' }}
            className='rounded-[10px] w-8 h-8 flex justify-center items-center absolute top-6 right-6'
            icon={<i className='fi fi-rr-arrow-small-right text-xl text-black leading-0'></i>}
            onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
            }}
          />
          <Calendar
            view={'mobile'}
            onChange={(from, to) => {
              setDate({ from, to });
            }}
            startDate={date.from}
            endDate={date.to}
            containerClassName='mt-24'
            locale='fa'
            disablePreviousDays={disablePreviousDays}
            type={type}
            doubleMonth={doubleMonth}
            renderDayFn={renderDayFn}
          />
          <Button
            className='mt-auto bg-primary-1 text-white h-12'
            block
            onClick={submitDateHandler}
            disabled={
              (type === 'range' && (!date.from || !date.to)) ||
              (type === 'single' && !date.from)
            }
          >
            ثبت
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default DatePicker;
