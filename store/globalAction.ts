import {Dispatcher} from "../interfaces/dispatcher";
import {Dispatch} from "redux";
import {CLEAR} from "./constants";

export function clear(): Dispatcher {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CLEAR });
  };
}

export default clear;