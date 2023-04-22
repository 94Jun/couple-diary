import styles from "./LetterCard.module.css";
import { formatDate } from "../../common";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../shared/Loading";
import { useDispatch } from "react-redux";
import { letterActions } from "../../modules/letterSlice";
import { modalActions } from "../../modules/modalSlice";

const LetterCard = ({ letter, fetchData }) => {
  const dispatch = useDispatch();
  const formattedDate = formatDate(new Date(letter.created_at)).slice(0, 14);
  const userInfo = useSelector((state) => state.login.userInfo);
  const { readers } = letter;
  const view = readers && readers.find((reader) => reader?.user_id === userInfo.user_id);
  let dear = letter.user_id === userInfo.user_id ? userInfo.couple_user_info.nickname : userInfo.nickname;
  if (dear.length > 5) {
    dear = dear.slice(0, 5) + "..";
  }

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

  const handleLetterModal = async () => {
    if (!view) {
      await postLetterReader(letter.letter_id);
      await fetchData(userInfo.couple_id);
    }
    dispatch(letterActions.SELECT_LETTER(letter));
    dispatch(modalActions.OPEN_MODAL("letter"));
  };

  let element = <Loading />;
  if (userInfo && letter) {
    element = (
      <div className={`${letter.gender === "남" ? styles.male : styles.female}`} onClick={handleLetterModal}>
        <div className={styles.header}>
          <p className={styles.dear}>dear {dear}</p>
          <p className={styles.date}>{formattedDate}</p>
        </div>
        {!view && letter.user_id !== userInfo.user_id && <div className={styles.view_band}>새로운 편지</div>}
      </div>
    );
  }

  return element;
};

export default LetterCard;
