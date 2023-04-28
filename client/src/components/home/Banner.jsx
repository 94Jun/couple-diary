import MainButton from "../shared/button/MainButton";
import styles from "./Banner.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { modalActions } from "../../modules/modalSlice";
import { Link } from "react-router-dom";
const Banner = ({ userInfo, start }) => {
  const dispatch = useDispatch();
  const today = new Date();
  const startDate = new Date(start?.event_date);
  const pastDay = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
  let element;
  if (userInfo.is_couple && start) {
    element = (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.profile}>
            <img src={userInfo.profile_url} />
          </div>
          <div className={styles.name}>
            <span>{userInfo.nickname}</span>
            <span className={styles.heart_icon}>
              <FavoriteBorderIcon color="inherit" fontSize="inherit" />
            </span>
            <span>{userInfo.couple_user_info.nickname}</span>
          </div>
          <div className={styles.day}>{pastDay}일</div>
          {startDate && <div className={styles.start_date}>{startDate.toLocaleDateString()} ~</div>}
        </div>
      </div>
    );
  }
  if (userInfo.is_couple && !start) {
    element = (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.profile}>
            <img src={userInfo.profile_url} />
          </div>
          <div className={styles.name}>
            <span>{userInfo.nickname}</span>
            <span className={styles.heart_icon}>
              <FavoriteBorderIcon color="inherit" fontSize="inherit" />
            </span>
            <span>{userInfo.couple_user_info.nickname}</span>
          </div>
          <div className={styles.day}>
            <Link to="/anniversary/add">첫 만남 입력</Link>
          </div>
        </div>
      </div>
    );
  }
  if (!userInfo.is_couple) {
    element = (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.profile}>
            <img src="https://couple-diary.s3.ap-northeast-2.amazonaws.com/profile/default_profile.jpeg" />
          </div>
          <div className={styles.register}>
            <MainButton
              onClick={() => {
                dispatch(modalActions.OPEN_MODAL("register"));
              }}
            >
              커플 등록
            </MainButton>
          </div>
        </div>
      </div>
    );
  }
  return element;
};

export default Banner;
