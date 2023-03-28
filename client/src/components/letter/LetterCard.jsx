import styles from "./LetterCard.module.css";
import { formatDate } from "../../common";
import axios from "axios";
import { useSelector } from "react-redux";

const LetterCard = ({ letter, openLetterView, getLettersByCoupleId }) => {
  const timestamp = formatDate(new Date(letter.created_at));
  const userInfo = useSelector((state) => state.login.userInfo);
  const { letter_readers } = letter;
  const view = letter_readers && letter_readers.find((reader) => reader?.user_id === userInfo.user_id);

  let contentPreview = letter.content.slice(0, 100);

  /** 편지 클릭에 따른 letter_readers 테이블 POST */
  const postLetterReader = async (letter_id) => {
    const config = {
      url: `/api/letter/reader`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { letter_id, user_id: userInfo.user_id },
    };
    try {
      await axios(config);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleClick = async () => {
    openLetterView(letter);
    if (!view) {
      await postLetterReader(letter.letter_id);
      await getLettersByCoupleId(userInfo.couple_id);
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
        <p>{view ? "읽음" : "읽지 않음"}</p>
        <p className={styles.timestamp}>{timestamp}</p>
      </div>
    </div>
  );
};

export default LetterCard;
