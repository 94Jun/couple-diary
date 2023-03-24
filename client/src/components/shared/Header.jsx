import Title from "./Title";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import useToggle from "../../hooks/useToggle";
import Login from "../login/Login";
const Header = () => {
  const isLogin = useSelector((state) => state.login.isLogin);
  const [loginModal, toggleLoginModal] = useToggle(false);

  return (
    <header className={styles.header}>
      <Title />
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/schedule">일정</Link>
          </li>
          <li>
            <Link to="/anniversary">기념일</Link>
          </li>
          <li>
            <Link to="/memory">추억</Link>
          </li>
          <li>
            <Link to="/letter">편지</Link>
          </li>
          <li>{isLogin ? <Link to="/mypage">설정</Link> : <p onClick={toggleLoginModal}>로그인</p>}</li>
        </ul>
      </nav>
      {loginModal && <Login toggleLoginModal={toggleLoginModal} />}
    </header>
  );
};

export default Header;
