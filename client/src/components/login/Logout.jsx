import MainButton from "../shared/button/MainButton";

const Logout = (props) => {
  const KAKAO_LOGUT_LINK = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URI}`;
  return (
    <a href={KAKAO_LOGUT_LINK} className={props.className}>
      <MainButton>로그아웃</MainButton>
    </a>
  );
};

export default Logout;
