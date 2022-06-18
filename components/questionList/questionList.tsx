import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./questionList.module.scss";
import { getAllQuestions } from "../../store/questions/action";
import { RootState } from "../../store/rootReducer";
import { QuestionInterface } from "../../interfaces/question.interface";
import QuestionBox from "../questionBox/questionBox";
const QuestionList = () => {
	const dispatch = useDispatch<any>();
	const questions = useSelector(
		({ questions }: RootState) => questions?.data.list
	) as Array<QuestionInterface>;
	useEffect(() => {
		dispatch(getAllQuestions());
	}, []);
	return <div>{questions.map(question => <QuestionBox question={question}/>)}</div>;
};

export default QuestionList;
