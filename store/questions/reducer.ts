import { AnyAction } from "redux";
import {
	QUESTION_REQUEST_IN_PROGRESS,
	QUESTION_FETCHED,
	QUESTION_CREATED,
	QUESTION_UPDATED,
	QUESTION_REQUEST_FAILURE,
	CLEAR
} from "../constants";
import { RequestInstance } from "../request";
import { ReducerInitialState } from "../../interfaces/reducerInitailState";
import { QuestionInterface } from "../../interfaces/question.interface";
const initialState: ReducerInitialState<{
	list: Array<QuestionInterface>;
}> = {
	loading: false,
	data: {
		list: [],
	},
	error: false,
};

export default function (
	state = initialState,
	action: AnyAction
): ReducerInitialState {
	if (action.type === QUESTION_REQUEST_IN_PROGRESS) {
		return {
			...state,
			loading: true,
			error: false,
		};
	} else if (action.type === QUESTION_FETCHED) {
		const list = action.payload?.data;
		return {
			data: {
				list,
			},
			loading: false,
			error: false,
		};
	} else if ([QUESTION_CREATED, QUESTION_UPDATED].includes(action.type)) {
		return {
			data: {
				list: state.data.list,
			},
			loading: false,
			error: false,
		};
	} else if (action.type === QUESTION_REQUEST_FAILURE) {
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
