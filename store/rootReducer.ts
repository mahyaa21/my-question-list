import { combineReducers } from 'redux';
import auth from './auth/reducer';
import { ReducerInitialState } from '../interfaces/reducerInitailState';
import { AuthStoreInterface } from '../interfaces/auth.interface';
import modals, { ModalsStoreInterface } from './modals/reducer';

export interface RootState {
  auth: ReducerInitialState<AuthStoreInterface>;
  modals: ModalsStoreInterface;
}

export default combineReducers<RootState>({
  auth,
  modals,
});
