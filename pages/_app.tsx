import "../styles/globals.scss";
import type { AppProps } from "next/app";
import MainLayout from "../components/layout/mainLayout/mainLayout";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
	);
}

export default MyApp;
