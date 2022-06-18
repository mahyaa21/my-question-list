import { AnyAction } from "redux";
import {
	AUTH_FAILED_LOGIN,
	AUTH_START_LOGIN,
	AUTH_SUCCESS_LOGIN,
	CLEAR,
} from "../constants";
import { ReducerInitialState } from "../../interfaces/reducerInitailState";
import { AuthStoreInterface } from "../../interfaces/auth.interface";

const initialState: ReducerInitialState<{
	user: AuthStoreInterface;
}> = {
	loading: false,
	data: {
		user: { isAuthenticated: true, fullName: "" },
	},
	error: false,
};

export default function (
	state = initialState,
	action: AnyAction
): ReducerInitialState {
	if (action.type === AUTH_START_LOGIN) {
		return {
			...state,
			loading: true,
			error: false,
		};
	} else if (action.type === AUTH_SUCCESS_LOGIN) {
		const user = action.payload?.data;
		return {
			data: {
				user,
			},
			loading: false,
			error: false,
		};
	} else if (action.type === AUTH_FAILED_LOGIN) {
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
