import { AxiosResponse } from 'axios';
import { Dispatcher } from '../../interfaces/dispatcher';
import {
  CARD_CREATED,
  CARD_MOVED,
  CARD_UPDATED,
  CARDS_REQUEST_FAILURE,
  CARDS_REQUEST_IN_PROGRESS,
} from '../constants';
import { RequestInstance } from '../request';

const CONTEXT = 'KIAN_DIGITAL';

export function moveCard(
  cardId: string,
  fromPhaseId: string,
  toPhaseId: string,
): Dispatcher<AxiosResponse> {
  return async (dispatch) => {
    try {
      dispatch({ type: CARDS_REQUEST_IN_PROGRESS });

      const response = await RequestInstance.put(`/${CONTEXT}/card/move`, {
        cardId,
        fromPhaseId,
        toPhaseId,
      });

      dispatch({
        type: CARD_MOVED,
        payload: response.data,
      });
      return response;
    } catch (e) {
      dispatch({ type: CARDS_REQUEST_FAILURE });
      throw e;
    }
  };
}

export function createCard(
  currentPhase: string,
  pipe: string,
  values: Record<string, any>,
): Dispatcher<AxiosResponse> {
  return async (dispatch) => {
    try {
      dispatch({ type: CARDS_REQUEST_IN_PROGRESS });

      const response = await RequestInstance.post(`/${CONTEXT}/card`, {
        done: false,
        currentPhase,
        pipeId: pipe,
        values,
      });

      dispatch({
        type: CARD_CREATED,
        payload: response.data,
      });
      return response;
    } catch (e) {
      dispatch({ type: CARDS_REQUEST_FAILURE });
      throw e;
    }
  };
}

export function updateCard(
  updatedCard: { id: string; values: Record<string, any> },
  phaseId: string,
): Dispatcher<AxiosResponse> {
  return async (dispatch) => {
    try {
      dispatch({ type: CARDS_REQUEST_IN_PROGRESS });

      const response = await RequestInstance.put(
        `/${CONTEXT}/card/data`,
        updatedCard,
      );

      dispatch({
        type: CARD_UPDATED,
        payload: {
          values: updatedCard.values,
          phaseId,
        },
      });
      return response;
    } catch (e) {
      dispatch({ type: CARDS_REQUEST_FAILURE });
      throw e;
    }
  };
}
