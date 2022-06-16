import { RequestInstance } from '../request';
import { Dispatcher } from '../../interfaces/dispatcher';
import { ErrorUtils } from '../../lib/errorUtils';
import {
  FIELDS_FETCHED,
  FIELD_CREATED,
  FIELD_FETCHED,
  FIELD_UPDATED,
  FIELD_REQUEST_FAILURE,
  FIELD_REQUEST_IN_PROGRESS,
} from '../constants';
import {
  getFieldPath,
  getFieldsPath,
  createFieldPath,
  updateFieldPath,
} from './service';
import { FieldInterface } from '../../interfaces/field.interface';
import showMessage from '../../components/showMessage/showMessage';
const CONTEXT = 'KIAN_DIGITAL';

export function getFields(): Dispatcher {
  return async (dispatch) => {
    try {
      dispatch({ type: FIELD_REQUEST_IN_PROGRESS });

      const response = await RequestInstance.get<Array<FieldInterface>>(
        getFieldsPath(CONTEXT),
        {
          params: {
            pageNo: 0,
            pageSize: 1000,
            sortType: 'DESC'
          },
        },
      );

      dispatch({
        type: FIELDS_FETCHED,
        payload: { data: response.data },
      });
      return Promise.resolve();
    } catch (error) {
      return handleApplicationFailure(dispatch, error);
    }
  };
}
export function getField(id: string): Dispatcher {
  return async (dispatch) => {
    try {
      dispatch({ type: FIELD_REQUEST_IN_PROGRESS });

      const response = await RequestInstance.get<FieldInterface>(
        getFieldPath(id, CONTEXT),
        {},
      );

      dispatch({
        type: FIELD_FETCHED,
        payload: {
          id,
          data: response.data,
        },
      });
      return Promise.resolve();
    } catch (error) {
      return handleApplicationFailure(dispatch, error);
    }
  };
}
export function createField(data: FieldInterface): Dispatcher<FieldInterface> {
  return async (dispatch) => {
    try {
      dispatch({ type: FIELD_REQUEST_IN_PROGRESS });

      const response = await RequestInstance.post<FieldInterface>(
        createFieldPath(CONTEXT),
        data,
      );
      showMessage('فیلد با موفقیت ثبت شد', { type: 'success' });
      dispatch({
        type: FIELD_CREATED,
        payload: { data: response.data },
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return handleApplicationFailure(dispatch, error);
    }
  };
}
export function updateField(data: FieldInterface): Dispatcher {
  return async (dispatch) => {
    try {
      dispatch({ type: FIELD_REQUEST_IN_PROGRESS });

      const response = await RequestInstance.put<FieldInterface>(
        updateFieldPath(CONTEXT),
        data,
      );
      showMessage('فیلد با موفقیت بروزرسانی شد', { type: 'success' });
      dispatch({
        type: FIELD_UPDATED,
        payload: {
          id: data.id,
          data: response.data,
        },
      });
      showMessage('فیلد با موفقیت بروزرسانی شد', { type: 'success' });
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
  showMessage(errorMessage as string, { type: 'error' });
  dispatch({
    type: FIELD_REQUEST_FAILURE,
    payload: { errorMessage, errorCode },
  });
  return Promise.reject(errorMessage);
}
