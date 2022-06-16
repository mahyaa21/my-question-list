import { AnyAction } from 'redux';
import {
  CARD_CREATED,
  CARD_MOVED,
  CARD_UPDATED,
  CARDS_REQUEST_FAILURE,
  CARDS_REQUEST_IN_PROGRESS,
  CLEAR,
} from '../constants';
import { ReducerInitialState } from '../../interfaces/reducerInitailState';

const initialState: ReducerInitialState<Record<string, unknown>> = {
  loading: false,
  data: {},
  error: false,
};

export default function (
  state = initialState,
  action: AnyAction,
): ReducerInitialState {
  if (action.type === CARDS_REQUEST_IN_PROGRESS) {
    return {
      ...state,
      loading: true,
      error: false,
    };
  } else if ([CARD_CREATED, CARD_UPDATED, CARD_MOVED].includes(action.type)) {
    return {
      ...state,
      loading: false,
      error: false,
    };
  } else if (action.type === CARDS_REQUEST_FAILURE) {
    return {
      ...state,
      loading: false,
      error: true,
    };
  } else if (action.type === CLEAR) {
    return initialState;
  }
  return state;
}
