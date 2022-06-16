export interface DataSourceInterface {
  method: HttpMethod;
  url: string;
  body: Record<string, unknown>;
  header: Record<string, string>;
}

export interface ValidationInterface {
  required: boolean;
  input?: InputFieldValidationInterface;
  select?: SelectFieldValidationInterface;
  file?: FileFieldValidationInterface;
}

interface BaseValidationInterface {
  message?: string;
}

export interface InputFieldValidationInterface extends BaseValidationInterface {
  maxLength: number;
  minLength?: number;
  max?: number;
  min?: number;
  pattern?: string | RegExp;
}

export interface SelectFieldValidationInterface
  extends BaseValidationInterface {
  multiple: boolean;
}

export interface FileFieldValidationInterface extends BaseValidationInterface {
  multiple: boolean;
  accept: string;
  maxSize: number;
}

export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';
