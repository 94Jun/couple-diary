import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import MainButton from "../shared/button/MainButton";
import styles from "./CoupleRegister.module.css";
import CancelButton from "../shared/button/CancelButton";
import useLoginMaintenance from "../../hooks/useLoginMaintenance";

const CoupleRegister = ({ toggleCoupleRegisterModal }) => {
  const [enteredCoupleCode, setEnteredCoupleCode] = useState("");
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [partnerStatus, setPartnerStatus] = useState("required");
  const [myCoupleSign, setMyCoupleSign] = useState();
  const userInfo = useSelector((state) => state.login.userInfo);
  const loginMaintenance = useLoginMaintenance();
  let statusText = "커플 코드를 입력해 주세요.";
  if (partnerStatus === "self") {
    statusText = "본인의 커플 코드입니다.";
  }
  if (partnerStatus === "duplication") {
    statusText = "상대방이 이미 커플 상태입니다.";
  }
  if (partnerStatus === "available") {
    statusText = "커플 신청이 가능합니다.";
  }
  if (partnerStatus === "nonexistent") {
    statusText = "존재하지 않는 코드입니다. 다시 확인해주세요.";
  }

  const handleCoupleCodeChange = (e) => {
    setEnteredCoupleCode(e.target.value);
  };

  /** 커플 코드를 통해 상대방 정보 확인 */
  const checkCoupleCode = async () => {
    const config = {
      url: `/api/user/couple-code/${enteredCoupleCode}`,
      method: "GET",
    };
    try {
      const res = await axios(config);
      setPartnerInfo(res.data[0]);
      if (res.data[0].user_id === userInfo.user_id) {
        setPartnerStatus("self");
      } else if (res.data[0].is_couple) {
        setPartnerStatus("duplication");
      } else {
        setPartnerStatus("available");
      }
    } catch (error) {
      setPartnerStatus("nonexistent");
    }
  };

  /** 내가 등록한 couple_sign 및 해당 유저 정보 GET */
  const getMyCoupleSign = async (user_id) => {
    const config = {
      url: `/api/couple/couple-sign/join-user/${user_id}`,
      method: "GET",
    };
    const res = await axios(config);
    setMyCoupleSign(res.data);
  };
  /** 커플 등록 제출(나의 코드를 상대방도 등록했는지 확인, 등록된 경우 couple 등록 및 couple_sign 삭제, 등록 안된 경우 couple_sign 등록) */
  const handleCoupleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: `/api/couple/regist`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { user_id1: userInfo.user_id, couple_code1: userInfo.couple_code, user_id2: partnerInfo.user_id, couple_code2: partnerInfo.couple_code },
    };
    try {
      await axios(config);
      await getMyCoupleSign(userInfo.user_id);
      loginMaintenance();
      toggleCoupleRegisterModal();
    } catch (error) {
      alert("커플 등록에 실패했습니다.");
    }
  };

  /** sign_id 로 커플 사인 삭제 */
  const deleteCoupleSign = async (sign_id) => {
    const config = {
      url: `/api/couple/couple-sign/${sign_id}`,
      method: "DELETE",
    };
    try {
      await axios(config);
      await getMyCoupleSign(userInfo.user_id);
    } catch (error) {
      alert("커플 요청취소에 실패했습니다.");
    }
  };

  useEffect(() => {
    if(userInfo){
      getMyCoupleSign(userInfo.user_id);
    }
  }, []);

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.title}>커플 등록</h2>
      {myCoupleSign && myCoupleSign.length > 0 ? (
        myCoupleSign.map((sign) => {
          return (
            <div key={sign.user_id}>
              <div className={styles.request_text_wrap}>
                <p>{sign.nickname}님에게 커플 요청 중..</p>
                <p>상대방에게 코드를 알려주세요.</p>
                <p>코드 : {userInfo.couple_code}</p>
              </div>
              <div className={styles.button_wrap}>
                <CancelButton onClick={toggleCoupleRegisterModal}>닫기</CancelButton>
                <MainButton onClick={() => deleteCoupleSign(sign.sign_id)}>요청 취소</MainButton>
              </div>
            </div>
          );
        })
      ) : (
        <form onSubmit={handleCoupleSubmit}>
          <div className={styles.code_wrap}>
            <input
              type="text"
              className={styles.input}
              value={enteredCoupleCode}
              onChange={handleCoupleCodeChange}
              placeholder="상대방의 커플 코드를 입력하세요."
            />
            <MainButton onClick={checkCoupleCode} type="button">
              확인
            </MainButton>
          </div>
          <div className={styles.partner_wrap}>
            <p className={styles.status_text}>나의 코드 : {userInfo.couple_code}</p>
            <p className={styles.status_text}>{statusText}</p>
            {partnerInfo && partnerStatus !== "self" && <p>닉네임: {partnerInfo.nickname}</p>}
          </div>
          <div className={styles.button_wrap}>
            <CancelButton onClick={toggleCoupleRegisterModal}>닫기</CancelButton>
            {partnerStatus === "available" && <MainButton>커플 등록</MainButton>}
          </div>
        </form>
      )}
    </div>
  );
};

export default CoupleRegister;
