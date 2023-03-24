import styles from "./LetterCard.module.css";
import { formatDate } from "../../common";

const LetterCard = ({ letter, openLetterView }) => {
  const timestamp = formatDate(new Date(letter.created_at));
  let contentPreview = letter.content.slice(0, 100);

  const handleClick = () => {
    if (contentPreview.length === 100) {
      openLetterView(letter);
    }
  };

  return (
    <div className={styles.letter_card} onClick={handleClick}>
      <div className={styles.card_content}>
        <p>
          {contentPreview}
          {contentPreview.length === 100 && "..."}
        </p>
      </div>
      <div className={styles.card_footer}>
        <p className={styles.nickname}>{letter.user_nickname}</p>
        <p className={styles.timestamp}>{timestamp}</p>
      </div>
    </div>
  );
};

export default LetterCard;
