import styles from "./Title.module.css";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <Link to="/">
      <div className={styles.container}>
        <div className={styles.img_wrap}>
          <img src="https://couple-diary.s3.ap-northeast-2.amazonaws.com/assets/logo_1.svg" />
        </div>
        <div className={styles.text_wrap}>
          <p>Couple</p>
          <p>Diary</p>
        </div>
      </div>
    </Link>
  );
};

export default Title;
