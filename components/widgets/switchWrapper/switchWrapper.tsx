import React from 'react';
import Toggle from '@atlaskit/toggle';
import style from './switchWrapper.scss';

interface SwitchWrapperProps {
  isChecked: boolean;
  onChange: (event) => void;
  label: string;
  labelClassName?: any;
  description?: string;
  isDisabled?: boolean;
}
function SwitchWrapper({
  isChecked,
  onChange,
  label,
  labelClassName,
  description,
  isDisabled,
}: SwitchWrapperProps) {
  return (
    <div className={style.switchButtonContainer}>
      <div className={labelClassName ?? style.switchButtonTitle}>
        <span>{label}</span>
        {description && <div className={style.description}>{description}</div>}
      </div>
      <Toggle
        id="toggle-controlled"
        isDisabled={isDisabled}
        onChange={onChange}
        isChecked={isChecked}
      />
    </div>
  );
}

export default SwitchWrapper;
