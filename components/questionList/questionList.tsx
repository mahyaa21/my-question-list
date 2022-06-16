import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./questionList.module.scss";
import { getAllQuestions } from "../../store/questions/action";
import { RootState } from "../../store/rootReducer";
import { QuestionInterface } from "../../interfaces/questionInterface";
const QuestionList = () => {
	const dispatch = useDispatch<any>();
	const questions = useSelector(
		({ questions }: RootState) => questions?.data.list
	) as Array<QuestionInterface>;
	useEffect(() => {
		dispatch(getAllQuestions());
	}, []);
	return <div className={styles.container}>{questions.map( question => <div>{question.title}</div>)}</div>;
};

export default QuestionList;
