import { Link } from "react-router-dom";
import styles from "./CoupleInfo.module.css";

const CoupleInfo = ({ userInfo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.profile_wrap}>
        <img src={userInfo.profile_url} />
      </div>
    </div>
  );
};

export default CoupleInfo;
