import { RequestInstance } from '../request';
import { Dispatcher } from '../../interfaces/dispatcher';
import { ErrorUtils } from '../../lib/errorUtils';
import { AuthStoreInterface } from '../../interfaces/auth.interface';
import {
  AUTH_FAILED_LOGIN,
  AUTH_START_LOGIN,
  AUTH_SUCCESS_LOGIN,
  LOGOUT,
  REFRESH_TOKEN,
  TOKEN,
} from '../constants';

export function getAuthenticatedUser(): Dispatcher {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_START_LOGIN });

      const response = await RequestInstance.get<Array<AuthStoreInterface>>(
        '/user',
        {
          params: {
            pageNo: 0,
            pageSize: 1000,
            sortType: 'DESC'
          },
        },
      );

      dispatch({
        type: AUTH_SUCCESS_LOGIN,
        payload: { data: response.data },
      });
      return Promise.resolve();
    } catch (error) {
      return handleApplicationFailure(dispatch, error);
    }
  };
}

function handleApplicationFailure(dispatch, error) {
  const errorCode = error.response?.data?.status;
  const errorMessage = ErrorUtils.getErrorMessage(
    error.response?.data?.exceptionMessage || errorCode,
  );
  dispatch({
    type: AUTH_FAILED_LOGIN,
    payload: { errorMessage, errorCode },
  });
  return Promise.reject(errorMessage);
}
