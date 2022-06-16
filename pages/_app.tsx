import type { AppProps } from "next/app";
import MainLayout from "../components/layout/mainLayout/mainLayout";
import '../static/css/main.css';
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
	);
}

export default MyApp;
