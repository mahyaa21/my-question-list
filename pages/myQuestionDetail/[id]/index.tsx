import styles from '../index.module.scss';
import QuestionDetail from '../../../components/questionDetail/questionDetail';
const myQuestionDetail = () => {
  return (
    <div className={styles.container}>
      <QuestionDetail/>
    </div>
  )
}

export default QuestionDetail;