import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./questionDetail.module.scss";
// import { getAnswersByAnswerId } from "../../store/answers/action";
import { RootState } from "../../store/rootReducer";
import { AnswerInterface } from "../../interfaces/answerInterface";
const QuestionDetail = () => {
    const router = useRouter();
	const dispatch = useDispatch<any>();
	const answers = useSelector(
		({ answers }: RootState) => answers?.data.list
	) as Array<AnswerInterface>;
	useEffect(() => {
		// dispatch(getAnswersByAnswerId());
	}, []);
	return <div className={styles.questionDetailContainer}>{answers.map( answers => <div>{answers.name}</div>)}</div>;
};

export default QuestionDetail;