import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { AuthStoreInterface } from "../interfaces/auth.interface";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
const Home: NextPage = () => {
	const router = useRouter();
	const { isAuthenticated } = useSelector(
		({ auth }: RootState) => auth?.data.user
	) as AuthStoreInterface;
	useEffect(() => {
		if (isAuthenticated) {
			router.push("/myQuestions");
		}
	}, [isAuthenticated]);
	return (
		<div className={styles.mainContainer}>
			<Head>
				<title>My question list app</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>لطفا چند لحظه صبر کنید</div>
		</div>
	);
};

export default Home;
