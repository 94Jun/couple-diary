import styles from "./MyPageLink.module.css";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../modules/modalSlice";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";
const MyPageLink = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);
  return (
    <div className={styles.container}>
      <Link to="/mypage" onClick={() => dispatch(modalActions.CLOSE_MODAL())}>
        <div>{userInfo.nickname}님</div>
        <div className={styles.link}>
          <span>마이 페이지</span>
          <button className={styles.link_icon}>
            <ArrowRightIcon fontSize="inherit" color="inherit" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default MyPageLink;
