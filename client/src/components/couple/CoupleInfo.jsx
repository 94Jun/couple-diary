import { Link } from "react-router-dom";
import styles from "./CoupleInfo.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { modalActions } from "../../modules/modalSlice";

const CoupleInfo = ({ userInfo }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <Link to="/mypage" onClick={() => dispatch(modalActions.CLOSE_MODAL())}>
        <div className={styles.profile_wrap}>
          <img src={userInfo.profile_url} />
        </div>
        <div className={styles.name_wrap}>
          <span>{userInfo.nickname}</span>
          <span className={styles.heart_icon}>
            <FavoriteIcon fontSize="inherit" color="inherit" />
          </span>
          <span>{userInfo.couple_user_info.nickname}</span>
        </div>
      </Link>
    </div>
  );
};

export default CoupleInfo;
