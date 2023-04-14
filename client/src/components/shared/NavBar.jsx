import styles from "./NavBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../modules/modalSlice";
import MainButton from "./button/MainButton";
import CloseIcon from "@mui/icons-material/Close";
import CoupleInfo from "../couple/CoupleInfo";
import Logout from "../login/Logout";
import CoupleDisconnect from "../couple/CoupleDisconnect";
import { Link } from "react-router-dom";

const navs = [
  {
    title: "일정",
    detail: [
      { url: "/schedule", text: "달력" },
      { url: "/schedule/all", text: "일정 보기"},
      { url: "/schedule/add", text: "일정 등록" },
    ],
  },
  {
    title: "기념일",
    detail: [
      { url: "/anniversary", text: "기념일 보기" },
      { url: "/anniversary/add", text: "기념일 등록" },
    ],
  },
  {
    title: "추억",
    detail: [
      { url: "/memory", text: "추억 보기" },
      { url: "/memory/add", text: "추억 등록" },
    ],
  },
  {
    title: "편지",
    detail: [
      { url: "/letter", text: "편지 보기" },
      { url: "/letter/add", text: "편지 쓰기" },
    ],
  },
];

const NavBar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);

  let headerContent = <MainButton onClick={() => dispatch(modalActions.OPEN_MODAL("login"))}>로그인</MainButton>;
  if (userInfo) {
    if (userInfo.is_couple) {
      headerContent = <CoupleInfo userInfo={userInfo} />;
    } else {
      headerContent = <MainButton onClick={() => dispatch(modalActions.OPEN_MODAL("register"))}>커플 등록</MainButton>;
    }
  }

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.header}>
        <button className={styles.close_btn} onClick={() => dispatch(modalActions.CLOSE_MODAL())}>
          <CloseIcon fontSize="inherit" />
        </button>
        {headerContent}
      </div>
      <nav className={styles.nav}>
        <ul>
          {navs.map((nav) => {
            return (
              <li key={nav.title} className={styles.nav_wrap}>
                <div className={styles.nav_title}>{nav.title}</div>
                <ul>
                  {nav.detail.map((el) => {
                    return (
                      <Link to={el.url} key={el.text} onClick={() => dispatch(modalActions.CLOSE_MODAL())}>
                        <li className={styles.detail}>{el.text}</li>
                      </Link>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
      {userInfo && <Logout />}
      {userInfo?.is_couple && <CoupleDisconnect />}
    </div>
  );
};

export default NavBar;
