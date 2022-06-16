import { NextComponentType, NextPageContext } from 'next';
import { AppInitialProps } from 'next/dist/pages/_app';
import { Provider } from "react-redux";
import MainLayout from "../components/layout/mainLayout/mainLayout";
import "../static/css/main.css";
import { useStore } from "../store/store";
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
