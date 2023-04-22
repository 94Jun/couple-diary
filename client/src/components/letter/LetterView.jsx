import styles from "./LetterView.module.css";
import { formatDate } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../shared/Loading";
import CancelButton from "../shared/button/CancelButton";
import { modalActions } from "../../modules/modalSlice";
import { letterActions } from "../../modules/letterSlice";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const LetterView = () => {
  const dispatch = useDispatch();
  const selectedLetter = useSelector((state) => state.letter.selectedLetter);
  const userInfo = useSelector((state) => state.login.userInfo);
  const formattedDate = selectedLetter ? formatDate(new Date(selectedLetter.created_at)) : null;
  const [style, setStyle] = useState();

  /** 취소 클릭 handler */
  const handleCancelModal = () => {
    dispatch(modalActions.CLOSE_MODAL());
    dispatch(letterActions.SELECT_LETTER(null));
  };

  /** 편지내용 min-height 설정 */
  const mainRef = useRef(null);
  const footerRef = useRef(null);
  useEffect(() => {
    if (mainRef && footerRef) {
      const mainHeight = mainRef.current.offsetHeight;
      const footerHeight = footerRef.current.offsetHeight;
      setStyle({ minHeight: `${mainHeight - footerHeight - 20}px` });
    }
  }, [mainRef, footerRef]);

  /** 편지 삭제 함수 */
  const deleteLetter = async (letter_id) => {
    const config = {
      url: `/api/letter/${letter_id}`,
      method: "DELETE",
    };
    await axios(config);
  };

  /** 편지 삭제 handler*/
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteLetter(selectedLetter.letter_id);
      dispatch(letterActions.ACTIVE_TRIGGER());
      handleCancelModal();
    }
  };

  let element = <Loading />;
  if (selectedLetter) {
    element = (
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <main className={styles.main} ref={mainRef}>
          <p className={styles.content} style={style}>
            {selectedLetter.content}
          </p>
          <div ref={footerRef}>
            <p className={styles.date}>{formattedDate}</p>
            <p className={styles.writer}>{selectedLetter.nickname}</p>
            <div className={styles.btn_wrap}>
              <CancelButton onClick={handleCancelModal}>닫기</CancelButton>
              {selectedLetter.user_id === userInfo.user_id && (
                <button className={styles.delete_btn} onClick={handleDelete}>
                  편지 삭제
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return element;
};

export default LetterView;
