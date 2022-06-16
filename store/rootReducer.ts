import { combineReducers } from 'redux';
import auth from './auth/reducer';
import questions from './questions/reducer';
import { ReducerInitialState } from '../interfaces/reducerInitailState';
import { AuthStoreInterface } from '../interfaces/auth.interface';
import modals, { ModalsStoreInterface } from './modals/reducer';
import { QuestionInterface } from '../interfaces/questionInterface';
export interface RootState {
  auth: ReducerInitialState<AuthStoreInterface>;
  modals: ModalsStoreInterface;
  questions: ReducerInitialState<{
    list: Array<QuestionInterface>;
  }>
}

export default combineReducers<RootState>({
  auth,
  modals,
  questions
});
