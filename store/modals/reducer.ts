import { AnyAction } from 'redux';
import { CLEAR, CLOSE_MODAL, OPEN_MODAL } from '../constants';

export interface ModalStoreInterface {
  visible: boolean;
  data: any;
}

export type ModalsStoreInterface = Record<string, ModalStoreInterface>;

const initialState: ModalsStoreInterface = {};

export default function (
  state = initialState,
  action: AnyAction,
): ModalsStoreInterface {
  if (action.type === OPEN_MODAL) {
    return {
      ...state,
      [action.payload?.modalKey]: {
        visible: true,
        data: action.payload?.data,
      },
    };
  } else if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      [action.payload?.modalKey]: { visible: false },
    };
  } else if (action.payload === CLEAR) {
    return initialState;
  }
  return state;
}
