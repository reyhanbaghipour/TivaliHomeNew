import { useState } from 'react';
import { Input as AntDInput } from 'antd';
import classNames from 'classnames';
import { PasswordProps } from 'antd/es/input';

interface Props extends PasswordProps {
  label?: string;
  name?: string;
  value?: string;
}

const PasswordInput: React.FC<Props> = ({
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
      <AntDInput.Password
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
          error && '!border-error',
          className
        )}
        placeholder={placeholder}
      />
      <label
        className={classNames(
          'absolute transition-all duration-200 text-sm p-[.2rem] text-black',
          focused
            ? '-top-[.813rem] right-2  bg-white visible z-10 text-primary-1'
            : !focused && value?.length
            ? '-top-[.813rem] right-2  bg-white visible z-10 text-black'
            : 'top-[.875rem] right-2 text-[#BFBFBF] invisible',
          error && '!text-error'
        )}
        htmlFor={name}
      >
        {label ?? placeholder}
      </label>
    </>
  );
};

export default PasswordInput;
