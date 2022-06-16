import { Dispatcher } from "../../interfaces/dispatcher";
import {
	QUESTION_REQUEST_IN_PROGRESS,
	QUESTION_FETCHED,
	QUESTION_CREATED,
	QUESTION_UPDATED,
	QUESTION_REQUEST_FAILURE,
} from "../constants";
import { ErrorUtils } from '../../lib/errorUtils';
import { RequestInstance } from "../request";
import { QuestionInterface } from "../../interfaces/questionInterface";
export function getAllQuestions(): Dispatcher {
	return async (dispatch) => {
		try {
			dispatch({ type: QUESTION_REQUEST_IN_PROGRESS });

			const response = await RequestInstance.get<Array<QuestionInterface>>(
				"/questions",
				{
					params: {
						pageNo: 0,
						pageSize: 1000,
						sortType: "DESC",
					},
				}
			);

			dispatch({
				type: QUESTION_FETCHED,
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
		type: QUESTION_REQUEST_FAILURE,
		payload: { errorMessage, errorCode },
	});
	return Promise.reject(errorMessage);
}
