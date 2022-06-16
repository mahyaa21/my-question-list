import React, { useState, useMemo, useEffect } from 'react';
import Select from '@atlaskit/select';
import style from './selectWrapper.scss';

export interface SelectedItemInterface {
  value: string;
  label: any;
}
interface SelectWrapperInterface {
  label?: string;
  options: Array<SelectedItemInterface>;
  value?: string;
  placeholder?: string;
  onChange?: (e) => void;
  defaultValue?: SelectedItemInterface;
  autoFocus?: boolean;
  isMulti?: boolean;
  openMenuOnFocus?: boolean;
  classNamePrefix?: string;
  onFocus?: () => void;
  isRequired?: boolean;
  description?: string;
  disabled?: boolean;
}

function SelectWrapper({
  label,
  options,
  value,
  placeholder,
  onChange,
  defaultValue,
  autoFocus,
  isMulti,
  openMenuOnFocus,
  classNamePrefix,
  onFocus,
  isRequired,
  description,
  disabled,
}: SelectWrapperInterface) {
  const [pageDocument, setPageDocument] = useState<HTMLElement | null>(null);
  const selectedItem = useMemo(
    () => options?.find((item) => item.value === value),
    [value, options],
  );
  useEffect(() => {
    if (document) {
      setPageDocument(document.body);
    } else {
      setPageDocument(null);
    }
  }, []);

  return (
    <div className={style.selectContainer}>
      <div className={style.selectLabel}>
        {isRequired ? '*' : ''}
        {label}
      </div>
      <div className={style.description}>{description ?? ''}</div>
      <div className={style.selectWrapper}>
        <Select
          inputId="grouped-options-example"
          className={style.select}
          options={options}
          value={selectedItem}
          onChange={onChange}
          placeholder={placeholder}
          defaultValue={defaultValue}
          openMenuOnFocus={openMenuOnFocus}
          autoFocus={autoFocus}
          isMulti={isMulti}
          onFocus={onFocus}
          classNamePrefix={classNamePrefix ?? 'automation-select-pipe'}
          isRequired={isRequired}
          menuPortalTarget={pageDocument}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          isDisabled={disabled}
        />
      </div>
    </div>
  );
}
export default SelectWrapper;
