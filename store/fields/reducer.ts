import { AnyAction } from 'redux';
import { ReducerInitialState } from '../../interfaces/reducerInitailState';
import {
  FIELDS_FETCHED,
  FIELD_FETCHED,
  FIELD_REQUEST_FAILURE,
  FIELD_REQUEST_IN_PROGRESS,
  FIELD_CREATED,
  FIELD_UPDATED,
  CLEAR,
} from '../constants';
import { FieldInterface } from '../../interfaces/field.interface';

const initialState: ReducerInitialState<{
    list: Array<FieldInterface>;
    map?: Record<string, FieldInterface>;
  }> = {
    loading: false,
    data: {
      list: [],
    },
    error: false,
  };

export default function (
  state = initialState,
  action: AnyAction,
): ReducerInitialState {
  if (action.type === FIELD_REQUEST_IN_PROGRESS) {
    return {
      ...state,
      loading: true,
      error: false,
    };
  } else if (action.type === FIELDS_FETCHED) {
    const list = action.payload?.data;
    const map = {};
    action.payload?.data.forEach((item) => {
      map[item.id as string] = item;
    });
    return {
      data: {
        list,
        map,
      },
      loading: false,
      error: false,
    };
  } else if (
    [FIELD_FETCHED, FIELD_CREATED, FIELD_UPDATED].includes(action.type)
  ) {
    const map = state.data.map || {};
    map[action.payload?.data?.id] = action.payload?.data;
    return {
      data: {
        list: state.data.list,
        map,
      },
      loading: false,
      error: false,
    };
  } else if (action.type === FIELD_CREATED) {
    return {
      data: state.data,
      loading: false,
      error: false,
    };
  } else if (action.type === FIELD_REQUEST_FAILURE) {
    return {
      ...state,
      error: true,
      loading: false,
      errorCode: action.payload?.errorCode,
      errorMessage: action.payload?.errorMessage,
    };
  } else if (action.type === CLEAR) {
    return initialState;
  }
  return state;
}
