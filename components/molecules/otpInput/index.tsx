import {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
  FC,
  useEffect,
} from 'react';
import { Col, Input, Row } from 'antd/lib';

import classNames from 'classnames';
import Countdown from '@/components/atoms/countdown';

interface Props {
  onCompelete: (value: string) => void;
  error?: boolean;
  onRetryOtp: () => Promise<boolean>;
  setError: (status: boolean) => void;
}

const OtpInput: FC<Props> = ({ onCompelete, error, onRetryOtp, setError }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '']);
  const [showCountDown, setShowCountDown] = useState(true);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const isEmpty = otp.find((input) => !input.length);

    if (isEmpty === undefined) {
      const value = otp.join('');
      onCompelete(value);
    }
  }, [otp]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input field if current one is filled
    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputPaste = (
    e: ClipboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData('text/plain')
      .slice(0, otp.length - index);
    const newOtp = [...otp];
    pasteData.split('').forEach((value, i) => {
      newOtp[index + i] = value;
    });
    setOtp(newOtp);

    // Move focus to next input field if current one is filled
    if (index + pasteData.length < otp.length && pasteData.length > 0) {
      inputRefs.current[index + pasteData.length].focus();
    }
  };

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    setError(false);
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const renderInputs = (): JSX.Element[] => {
    const inputs = [];
    for (let i = 0; i < otp.length; i++) {
      inputs.push(
        <Input
          key={i}
          //@ts-ignore
          ref={(el) => (inputRefs.current[i] = el)}
          value={otp[i]}
          onChange={(e) => handleInputChange(e, i)}
          onPaste={(e) => handleInputPaste(e, i)}
          onKeyDown={(e) => handleInputKeyDown(e, i)}
          className={classNames(
            'w-12 h-12 text-center border-0 border-b-2 hover:border-0 hover:border-b-2 focus:shadow-none rounded-none focus:border-primary-1 hover:border-primary-1 text-primary-1',
            otp[i].length && 'border-primary-1',
            error && '!border-error !text-error focus:!border-error'
          )}
          style={{ borderInlineEndWidth: '0' }}
          maxLength={1}
        />
      );
    }
    return inputs;
  };

  const finishCountDownHandler = () => {
    setShowCountDown(false);
  };

  const retryOtpHandler = async () => {
    const isNewOtpReady = await onRetryOtp();
    console.log(isNewOtpReady);

    if (isNewOtpReady) setShowCountDown(true);
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <Row gutter={[0, 32]} className='static'>
      <Col span={24} className='flex justify-between flex-row-reverse mb'>
        {renderInputs()}
      </Col>
      {error && (
        <Col span={24} className='text-center'>
          <span className='text-error'>کد وارد شده صحیح نیست</span>
        </Col>
      )}
      <Col
        span={24}
        className='text-center text-grey  absolute bottom-6 left-0 right-0 md:static'
      >
        {showCountDown ? (
          <>
            <Countdown
              duration={120}
              onFinish={finishCountDownHandler}
              resetTime={false}
            />
            <span>مانده تا ارسال مجدد کد</span>
          </>
        ) : (
          <span className='text-black' onClick={retryOtpHandler}>
            درخواست مجدد کد‌
          </span>
        )}
      </Col>
    </Row>
  );
};

export default OtpInput;
