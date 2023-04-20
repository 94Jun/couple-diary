import styles from "./LetterView.module.css";
import { formatDate } from "../../common";
const LetterView = ({ letter, closeLetterView }) => {
  const timestamp = formatDate(new Date(letter.created_at));

  return (
    <div className={styles.letter_view_container}>
      <div className={styles.letter_view} onClick={(e) => e.stopPropagation()}>
        <p className={styles.content}>{letter.content}</p>
        <p className={styles.writer}>{letter.nickname}</p>
        <p className={styles.timestamp}>{timestamp}</p>
        <div className={styles.close_button_wrap}>
          <button className={styles.close_button} onClick={closeLetterView}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterView;
