import MainButton from "../shared/button/MainButton";
import axios from "axios";
import { useSelector } from "react-redux";
import useLoginMaintenance from "../../hooks/useLoginMaintenance";

const CoupleDisconnect = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const loginMaintenance = useLoginMaintenance();

  /** 커플 연결 해제 : couples 테이블 DELETE 및 users 테이블 PUT */
  const disconnectCouple = async () => {
    const config = {
      url: `/api/couple/disconnect`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { couple_id: userInfo.couple_id, user_id1: userInfo.user_id, user_id2: userInfo.couple_user_info.user_id },
    };
    await axios(config);
    await loginMaintenance();
  };
  return <MainButton onClick={disconnectCouple}>커플 연결 해제</MainButton>;
};

export default CoupleDisconnect;
