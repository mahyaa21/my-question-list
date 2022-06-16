import { combineReducers } from 'redux';
import auth from './auth/reducer';
import questions from './questions/reducer';
import answers from './answers/reducer';
import { ReducerInitialState } from '../interfaces/reducerInitailState';
import { AuthStoreInterface } from '../interfaces/auth.interface';
import modals, { ModalsStoreInterface } from './modals/reducer';
import { QuestionInterface } from '../interfaces/questionInterface';
import { AnswerInterface } from '../interfaces/answerInterface';
export interface RootState {
  auth: ReducerInitialState<AuthStoreInterface>;
  modals: ModalsStoreInterface;
  questions: ReducerInitialState<{
    list: Array<QuestionInterface>;
  }>;
  answers:  ReducerInitialState<{
    list: Array<AnswerInterface>;
  }>;
}

export default combineReducers<RootState>({
  auth,
  modals,
  questions,
  answers
});
