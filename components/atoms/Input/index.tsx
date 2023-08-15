import { useState } from 'react';
import { Input as Antdinput, InputProps } from 'antd';
import classNames from 'classnames';
// import { InputProps } from 'rc-input/lib/interface';

interface Props extends InputProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
  name,
  value,
  onChange,
  label,
  placeholder,
  className,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const error = Boolean(rest['aria-invalid']);

  return (
    <>
      <Antdinput
        {...rest}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={classNames(
          'h-[3.25rem]  rounded-lg',
          focused && !error && '!border-primary-1',
          value && !focused && 'border-black',
          error && 'border-error',
          className
        )}
        placeholder={focused ? '' : placeholder}
      />

      <label
        className={classNames(
          'absolute transition-all duration-200 text-sm p-[.2rem]',
          focused
            ? '-top-[.813rem] right-2  bg-white visible z-10 text-primary-1'
            : !focused && value?.length
            ? '-top-[.813rem] right-2  bg-white visible z-10 text-black'
            : 'top-[.875rem] right-2 text-grey invisible',
          error && '!text-error'
        )}
        htmlFor={name}
      >
        {label ?? placeholder}
      </label>
    </>
  );
};

export default Input;
