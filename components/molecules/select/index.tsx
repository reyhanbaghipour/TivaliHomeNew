import { FC, useEffect, useState } from 'react';
import { Select as AntSelect } from 'antd';
import type { SelectProps } from 'antd';
import classNames from 'classnames';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

interface Props extends SelectProps {
  label: string;
}

const Select: FC<Props> = ({
  label,
  value,
  className,
  placeholder,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [inputClassList, setInputClassList] = useState(
    `h-[3.25rem]  rounded-lg border-black`
  );

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setFocused(false);
      setInputClassList('h-[3.25rem]  rounded-lg');
      return;
    }
  };
  const handlerOpenDropDown = (open: boolean) => {
    setOpenDropDown(open);
  };

  useEffect(() => {
    if (value) {
      setFocused(true);
      setInputClassList(`h-[3.25rem]  rounded-lg border-black`);
    }
  }, [value]);

  const error = Boolean(rest['aria-invalid']);

  return (
    <div className='relative w-full '>
      <AntSelect
        {...rest}
        placeholder={focused ? ' ' : placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={classNames(className, inputClassList)}
        value={value}
        suffixIcon={openDropDown ? <UpOutlined /> : <DownOutlined />}
        onDropdownVisibleChange={handlerOpenDropDown}
      />

      <label
        className={classNames(
          'absolute transition-all duration-200 text-sm p-[.2rem] z-0',
          focused
            ? '-top-[.813rem] right-3 text-black bg-white visible'
            : 'top-[.188rem] right-[.625rem]  invisible'
        )}
      >
        {label}
      </label>
    </div>
  );
};
export default Select;
