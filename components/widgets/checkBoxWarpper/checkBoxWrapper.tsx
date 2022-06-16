import React, { useCallback } from 'react';
import { Checkbox } from '@atlaskit/checkbox';
import style from './checkBoxWrapper.scss';

interface CheckBoxWrapperInterface {
  title?: string;
  options: Array<string>;
  onChange?: (e: any) => void;
  value?: any;
  isRequired?: boolean;
  readonly?: boolean;
}
function CheckBoxWrapper({
  title,
  options,
  onChange,
  value,
  readonly,
  isRequired,
}: CheckBoxWrapperInterface) {
  const isChecked = useCallback(
    (option) => {
      if (Array.isArray(value) && !readonly) {
        return value?.includes(option);
      } else {
        return false;
      }
    },
    [readonly, options, value],
  );
  return (
    <div>
      <div className={style.checkboxTitle}>
        {isRequired && '*'}
        {title}
      </div>
      <div className={style.optionsContainer}>
        {options.map((option) => (
          <Checkbox
            isChecked={isChecked(option)}
            onChange={onChange}
            label={option}
            value={option}
            name={option}
            readOnly={readonly}
          />
        ))}
      </div>
    </div>
  );
}

export default CheckBoxWrapper;
