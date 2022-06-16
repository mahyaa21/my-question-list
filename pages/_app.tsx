import React from 'react';
import { Provider } from 'react-redux';
import { NextComponentType, NextPageContext } from 'next';
import { AppInitialProps } from 'next/dist/pages/_app';
import { useStore } from '../store/store';
import MainLayout from '../components/Layout/MainLayout/MainLayout';

interface MyAppProps extends AppInitialProps {
  Component: NextComponentType<NextPageContext, any, any>;
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}

export default MyApp;
