import { FC } from 'react';
import '../style/Checkbox.css';

interface CheckboxProps {
  defaultChecked?: boolean;
  onClick?: () => void;
  className?: string;
}
const Checkbox: FC<CheckboxProps> = ({
  defaultChecked,
}) => {
  return (
    <label  className='container'>
      <input defaultChecked={defaultChecked} type="checkbox" />
      <div className="checkmark"></div>
    </label>
  );
};

export default Checkbox;