import styles from "./Login.module.css";

const Login = () => {
  const KAKAO_LOGIN_LINK = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI}&response_type=code`;

  return (
    <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.login_title}>로그인</h2>
      <p className={styles.login_description}>오직 당신들만의 소중한 추억을 저장하세요!</p>
      <div className={styles.icon}>
        <img src="https://couple-diary.s3.ap-northeast-2.amazonaws.com/assets/login_icon_1.png" />
      </div>
      <a href={KAKAO_LOGIN_LINK} className={styles.login_button}>
        <img src="https://couple-diary.s3.ap-northeast-2.amazonaws.com/assets/kakao_login_medium_wide.png" alt="Kakao Login" />
      </a>
    </div>
  );
};

export default Login;
