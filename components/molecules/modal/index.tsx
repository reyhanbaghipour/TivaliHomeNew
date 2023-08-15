import { Button, Modal as Antdmodal } from 'antd';
import { useState } from 'react';

const Modal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Warning</Button>

      <Antdmodal
        className='!h-screen !w-full md:!w-[22.5rem] md:!h-[30.625rem] top-[4rem] '
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={handleOk}
            className='bg-primary-1 w-full h-[3.25rem] text-sm font-bold flex items-center justify-center gap-3 '
          >
            <i className='fi fi-rr-user'></i>
            بارگزاری‌سابقه
          </Button>,
          <Button
            key='cancel'
            onClick={handleCancel}
            className='border-white shadow-none w-full h-[3.25rem] text-sm'
          >
            انصراف
          </Button>,
        ]}
      >
        <div className='flex flex-col gap-8 items-center mb-96 md:mb-10'>
          <div className='flex items-center justify-center leading-0 w-20 h-20 bg-warning rounded-full text-[#CE7100] text-4xl'>
            <i className='fi fi-rr-bulb'></i>
          </div>
          <div className='flex flex-col gap-3 items-center'>
            <span className='text-sm font-bold'>توجه !</span>
            <p className='text-sm text-justify'>
              شما دارای سابقه مربی‌گری در سوابق آموزشی خود نیستید. در صورتی‌که
              مربی هستید، ابتدا سوابق مربی‌گری خود را ارسال نموده و منتظر تائید
              آن توسط فدراسیون بمانید ، سپس اقدام به تمدید یا فعال‌سازی عضویت
              خود بنمائید.
            </p>
          </div>
        </div>
      </Antdmodal>
    </>
  );
};

export default Modal;
