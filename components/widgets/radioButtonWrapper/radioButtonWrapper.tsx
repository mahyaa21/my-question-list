import React from 'react';
import { RadioGroup } from '@atlaskit/radio';
import style from './radioButtonWrapper.scss';

interface RadioButtonWrapperInterface {
  title: string;
  options: Array<Record<string, any>>;
  onChange?: (e: any) => void;
  value?: any;
  isRequired?: boolean;
}
function RadioButtonWrapper({
  title,
  options,
  onChange,
  value,
  isRequired
}: RadioButtonWrapperInterface) {
  return (
    <div>
      <div className={style.checkboxTitle}>
        {isRequired && '*'}
        {title}
      </div>
      <RadioGroup
        options={options}
        onChange={onChange}
        aria-labelledby="radiogroup-label"
        value={value}
      />
    </div>
  );
}

export default RadioButtonWrapper;
