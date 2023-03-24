import Backdrop from "../shared/Backdrop";
import ModalContainer from "../shared/ModalContainer";
import styles from "./Login.module.css";

const Login = ({ toggleLoginModal }) => {
  const KAKAO_LOGIN_LINK = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI}&response_type=code`;

  return (
    <Backdrop onClick={toggleLoginModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_content}>
          <h2 className={styles.login_title}>로그인</h2>
          <p className={styles.login_description}>오직 당신들만의 소중한 추억을 저장하세요!</p>
          <a href={KAKAO_LOGIN_LINK}>
            <img src="/images/kakao_login_medium_wide.png" alt="Kakao Login" />
          </a>
        </div>
      </ModalContainer>
    </Backdrop>
  );
};

export default Login;
