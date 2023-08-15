interface IconProps {
  id: string;
  className?: string;
}

const Icon = ({ id, className = '' }: IconProps) => (
  <svg className={className}>
    <use xlinkHref={`#${id}`} />
  </svg>
);

export default Icon;
