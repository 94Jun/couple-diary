import { Link } from "react-router-dom";
import styles from "./CoupleInfo.module.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useDispatch } from "react-redux";
import { modalActions } from "../../modules/modalSlice";

const CoupleInfo = ({ userInfo }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.profile_wrap}>
        <img src={userInfo.profile_url} />
      </div>
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

export default CoupleInfo;
