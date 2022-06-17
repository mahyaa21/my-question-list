import { AnyAction } from "redux";
import {
	ANSWER_REQUEST_IN_PROGRESS,
	ANSWER_FETCHED,
	ANSWER_CREATED,
	ANSWER_UPDATED,
	ANSWER_REQUEST_FAILURE,
	CLEAR
} from "../constants";
import { ReducerInitialState } from "../../interfaces/reducerInitailState";
import { AnswerInterface } from "../../interfaces/answer.interface";
const initialState: ReducerInitialState<{
	list: Array<AnswerInterface >;
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
	if (action.type === ANSWER_REQUEST_IN_PROGRESS) {
		return {
			...state,
			loading: true,
			error: false,
		};
	} else if (action.type === ANSWER_FETCHED) {
		const list = action.payload?.data;
		return {
			data: {
				list,
			},
			loading: false,
			error: false,
		};
	} else if ([ANSWER_CREATED, ANSWER_UPDATED].includes(action.type)) {
		return {
			data: {
				list: state.data.list,
			},
			loading: false,
			error: false,
		};
	} else if (action.type === ANSWER_REQUEST_FAILURE) {
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
