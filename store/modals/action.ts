import { Dispatcher } from '../../interfaces/dispatcher';
import { CLOSE_MODAL, OPEN_MODAL } from '../constants';

export function openModal(modalKey, data): Dispatcher {
  return async (dispatch) => {
    dispatch({
      type: OPEN_MODAL,
      payload: {
        modalKey,
        data,
      },
    });
  };
}

export function closeModal(modalKey): Dispatcher {
  return async (dispatch) => {
    dispatch({
      type: CLOSE_MODAL,
      payload: { modalKey },
    });
  };
}
