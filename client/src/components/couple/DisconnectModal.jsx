import { useState } from "react";
import styles from "./DisconnectModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import CancelButton from "../shared/button/CancelButton";
import CoupleDisconnect from "./CoupleDisconnect";
import { modalActions } from "../../modules/modalSlice";

const DisconnectModal = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);
  const [enteredText, setEnteredText] = useState("");
  const isValid = enteredText === "연결 해제" ? true : false;

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <h3 className={styles.title}>커플 연결 해제</h3>
      <p className={styles.text}>{userInfo?.couple_user_info?.nickname}님과의 연결을 해제하시겠습니까?</p>
      <p className={styles.sub_text}>해제하려면 "연결 해제"를 입력해주세요</p>
      <input type="text" className={styles.input} value={enteredText} onChange={(e) => setEnteredText(e.target.value)} />
      {isValid ? (
        <div className={styles.btn_wrap}>
          <CancelButton onClick={() => dispatch(modalActions.CLOSE_MODAL())}>취소</CancelButton>
          <CoupleDisconnect />
        </div>
      ) : (
        <div className={styles.btn_wrap}>
          <CancelButton onClick={() => dispatch(modalActions.CLOSE_MODAL())}>취소</CancelButton>
        </div>
      )}
    </div>
  );
};

export default DisconnectModal;
