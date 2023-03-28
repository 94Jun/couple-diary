import Title from "./Title";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import useToggle from "../../hooks/useToggle";
import Login from "../login/Login";
import { useEffect, useState } from "react";
const Header = () => {
  const isLogin = useSelector((state) => state.login.isLogin);
  const [loginModal, toggleLoginModal] = useToggle(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLogin !== null) {
      setIsLoading(false);
    }
  }, [isLogin]);

  let content;
  if (!isLoading && isLogin === true) {
    content = <Link to="/mypage">설정</Link>;
  }
  if (!isLoading && isLogin === false) {
    content = <p onClick={toggleLoginModal}>로그인</p>;
  }
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
          <li>{content}</li>
        </ul>
      </nav>
      {loginModal && <Login toggleLoginModal={toggleLoginModal} />}
    </header>
  );
};

export default Header;
