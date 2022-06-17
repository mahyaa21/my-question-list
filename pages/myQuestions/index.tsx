import styles from '../index.module.scss';
import QuestionList from '../../components/questionList/questionList';
const MyQuestions = () => {
  return (
    <div className={styles.MyQuestionsContainer}>
      <QuestionList/>
    </div>
  )
}

export default MyQuestions;
