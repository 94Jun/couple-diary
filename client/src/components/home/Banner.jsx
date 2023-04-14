import styles from "./Banner.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const Banner = ({ userInfo, start }) => {
  const today = new Date();
  const startDate = new Date(start?.event_date);
  const pastDay = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));

  return (
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
};

export default Banner;
