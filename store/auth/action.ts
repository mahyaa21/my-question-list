import axios from 'axios';
import getConfig from 'next/config';
import * as querystring from 'querystring';
import { wrappedLocalStorage } from '../../lib/hybridStorage';
import {
  AUTH_FAILED_LOGIN,
  AUTH_START_LOGIN,
  AUTH_SUCCESS_LOGIN,
  LOGOUT,
  REFRESH_TOKEN,
  TOKEN,
} from '../constants';
import { AccessTokenInterface } from '../../interfaces/auth';
import { StringUtils } from '../../lib/StringUtils';
import { clear } from '../globalAction';
import { RequestInstance } from '../request';

const {
  publicRuntimeConfig: { auth },
} = getConfig();

declare const location: Location;

export const login = (userName, password) => async dispatch => {
  try {
    dispatch({ type: AUTH_START_LOGIN });
    const response = await axios.post<AccessTokenInterface>(
      `${auth.baseUrl}/token?redirect_uri=http://localhost:3000/database`,
      querystring.stringify({
        grant_type: 'password',
        client_id: auth.clientId,
        username: userName,
        password: password,    
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    wrappedLocalStorage.setItem(TOKEN, response.data.access_token);
    wrappedLocalStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
    dispatch({ type: AUTH_SUCCESS_LOGIN });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: AUTH_FAILED_LOGIN });
    return Promise.reject(error);
  }
};

export const logout = () => async dispatch => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  try {
    await RequestInstance.post<void>(`${location.origin}/api/logout`, {
      refreshToken,
    });
  } finally {
    wrappedLocalStorage.removeItem(TOKEN);
    clear()(dispatch);
    dispatch({ type: LOGOUT });
  }
};
