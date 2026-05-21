import Icon from '@/components/primitives/Icon';

const CmdIcon = ({ name, className = '', style = {} }) => (
  <Icon
    name={ name }
    size='md'
    decorative
    className={ `text-gray-600 dark:text-gray-300 ${className}` }
    style={ style }
  />
);

export default CmdIcon;
