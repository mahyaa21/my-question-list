import { Dispatcher } from "../../interfaces/dispatcher";
import {
	ANSWER_REQUEST_IN_PROGRESS,
	ANSWER_FETCHED,
	ANSWER_CREATED,
	ANSWER_UPDATED,
	ANSWER_REQUEST_FAILURE,
} from "../constants";
import { ErrorUtils } from '../../lib/errorUtils';
import { RequestInstance } from "../request";
import { AnswerInterface } from "../../interfaces/answerInterface";
export function getAllAnswers(): Dispatcher {
	return async (dispatch) => {
		try {
			dispatch({ type: ANSWER_REQUEST_IN_PROGRESS });

			const response = await RequestInstance.get<Array<AnswerInterface>>(
				`/answers`,
				{
					params: {
						pageNo: 0,
						pageSize: 1000,
						sortType: "DESC",
					},
				}
			);

			dispatch({
				type: ANSWER_FETCHED,
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
		error.response?.data?.exceptionMessage || errorCode
	);
	dispatch({
		type: ANSWER_REQUEST_FAILURE,
		payload: { errorMessage, errorCode },
	});
	return Promise.reject(errorMessage);
}
