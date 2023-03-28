import MainButton from "../shared/button/MainButton";
import styles from "./PersonalSettings.module.css";
const PersonalSettings = () => {
  const KAKAO_LOGUT_LINK = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URI}`;
  return (
    <div>
      <h2>개인 설정</h2>
      <a href={KAKAO_LOGUT_LINK}>
        <MainButton>로그아웃</MainButton>
      </a>
    </div>
  );
};

export default PersonalSettings;
