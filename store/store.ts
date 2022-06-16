import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useMemo } from 'react';
import rootReducer from './rootReducer';

declare const window: any;

let store;

function initStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
}

export function initializeStore(preloadedState) {
  let innerStore = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    innerStore = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return innerStore;
  }
  // Create the store once in the client
  if (!store) {
    store = innerStore;
  }

  return innerStore;
}

export function useStore(initialState) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
