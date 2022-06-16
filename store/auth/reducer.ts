import {
  AUTH_FAILED_LOGIN,
  AUTH_START_LOGIN,
  AUTH_SUCCESS_LOGIN,
  LOGOUT,
  REFRESH_TOKEN,
  TOKEN,
} from '../constants';
import { ReducerInitialState } from '../../interfaces/reducerInitailState';
import { AuthStoreInterface } from '../../interfaces/auth.interface';
import { wrappedLocalStorage } from '../../lib/hybridStorage';
import { StringUtils } from '../../lib/StringUtils';

const isAuthorized = () =>
  StringUtils.isItFilled(wrappedLocalStorage.getItem(TOKEN)) &&
  StringUtils.isItFilled(wrappedLocalStorage.getItem(REFRESH_TOKEN));
const initialState: ReducerInitialState<AuthStoreInterface> = {
  error: false,
  loading: false,
  data: {
    isAuthenticated: false,
  },
};

export default (state = initialState, { type }) => {
  switch (type) {
    case AUTH_START_LOGIN:
      return { ...state, error: false, loading: true };
    case AUTH_SUCCESS_LOGIN:
      return {
        data: {
          ...state.data,
          isAuthenticated: true,
        },
        error: false,
        loading: false,
      };
    case AUTH_FAILED_LOGIN:
      return { ...state, error: true, loading: false };
    case LOGOUT:
      return { data: { isAuthenticated: false }, error: false, loading: false };
    default:
      return {
        ...state,
        data: { ...state.data, isAuthenticated: isAuthorized() },
      };
  }
};
