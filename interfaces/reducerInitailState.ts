export interface ReducerInitialState<T = any> {
  loading?: boolean;
  data: T;
  tried?: boolean;
  error?: boolean;
  errorCode?: string;
  errorMessage?: string;
  title?: string;
}
