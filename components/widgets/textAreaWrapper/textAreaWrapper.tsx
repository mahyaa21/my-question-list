import React, { Ref } from 'react';
import TextArea from '@atlaskit/textarea';
import style from './textAreaWrapper.module.scss';

interface InputWrapperInterface {
  name?: string;
  label?: string;
  onChange?: (e: any) => void;
  onBlur?: () => void;
  description?: string;
  placeholder?: string;
  value: any;
  icon?: any;
  readonly?: boolean;
  ref?: Ref<any>;
  isRequired?: boolean;
  minimumRows?: number;
}

function TextAreaWrapper({
  name,
  label,
  onChange,
  onBlur,
  description,
  placeholder,
  value,
  icon,
  ref,
  readonly,
  isRequired,
  minimumRows
}: InputWrapperInterface) {
  return (
    <div className={style.inputContainer}>
      {label && (
        <div className={style.label}>
          {icon}
          {isRequired && '*'}
          {label}
        </div>
      )}
      <TextArea
        name={name}
        aria-label="default text field"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        resize="auto"
        ref={ref}
        isReadOnly={readonly}
        minimumRows={minimumRows}
      />
      {description && <div className={style.description}>{description}</div>}
    </div>
  );
}

export default TextAreaWrapper;
