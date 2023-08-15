import { ReactNode } from 'react';
import { Typography } from 'antd';
const { Title } = Typography;

const TitlePage = ({
  children,
  icon,
  classParent,
}: {
  children: ReactNode | string;
  icon: string;
  classParent: string;
}) => {
  return (
    <div className={`flex gap-2 items-center w-full ${classParent}`}>
      <i className={`${icon} text-2xl text-black leading-0`}></i>
      <Title level={2} className='!text-sm md:!text-lg !font-bold !mb-0'>
        {children}
      </Title>
    </div>
  );
};

export default TitlePage;
