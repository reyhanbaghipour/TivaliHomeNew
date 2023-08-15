import { FC, useEffect, useRef, useState } from 'react';

interface Props {
  duration: number;
  resetTime: boolean;
  onFinish: () => void;
}

const Countdown: FC<Props> = ({ duration = 120, resetTime, onFinish }) => {
  const [time, setTime] = useState(duration);
  const interval = useRef<ReturnType<typeof setInterval> | number>(duration);

  const timeInterval = () => {
    interval.current = setInterval(() => {
      setTime((prevState) => prevState - 1);
    }, 1000);
  };

  const filterTime = (n: string | number, width = 2) => {
    n = n + '';
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join('0') + n;
  };

  useEffect(() => {
    timeInterval();

    return () => {
      clearInterval(interval.current as NodeJS.Timeout);
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      onFinish();
      clearInterval(interval.current as NodeJS.Timeout);
    }
  }, [onFinish, time]);

  useEffect(() => {
    if (resetTime) {
      setTime(duration);
      timeInterval();
    }

    return () => {
      clearInterval(interval.current as NodeJS.Timeout);
    };
  }, [duration, resetTime]);

  return <span className='mx-2'>{time}</span>;
};

export default Countdown;
