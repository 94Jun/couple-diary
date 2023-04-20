import styles from "./LetterCard.module.css";
import { formatDate } from "../../common";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

const LetterCard = ({ letter, openLetterView, fetchData, editMode }) => {
  const timestamp = formatDate(new Date(letter.created_at));
  const userInfo = useSelector((state) => state.login.userInfo);
  const { readers } = letter;
  const view = readers && readers.find((reader) => reader?.user_id === userInfo.user_id);

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

  const openLetterModal = async () => {
    openLetterView(letter);
    if (!view) {
      await postLetterReader(letter.letter_id);
      await fetchData(userInfo.couple_id);
    }
  };

  const deleteLetter = async () => {
    const config = {
      url: `/api/letter/${letter.letter_id}`,
      method: "DELETE",
    };
    await axios(config);
    await fetchData(userInfo.couple_id);
  };

  return (
    <div className={styles.letter_card}>
      <div className={styles.card_content} onClick={openLetterModal}>
        <p>
          {contentPreview}
          {contentPreview.length === 100 && "..."}
        </p>
      </div>
      <div className={styles.card_footer} onClick={openLetterModal}>
        <p className={styles.nickname}>{letter.nickname}</p>
        <div className={styles.other_wrap}>
          <p className={styles.timestamp}>{timestamp}</p>
          {userInfo.user_id !== letter.user_id ? view ? <p className={styles.view}>읽음</p> : <p className={styles.not_view}>읽지 않음</p> : null}
        </div>
      </div>
      {editMode && letter.user_id === userInfo.user_id && (
        <div className={styles.edit_wrap}>
          <button onClick={deleteLetter}>
            <DeleteIcon fontSize="inherit" color="inherit" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LetterCard;
