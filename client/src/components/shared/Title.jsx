import styles from "./Title.module.css";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Title = () => {
  return (
    <Link to="/">
      <h1 className={styles.title}>
        Couple
        <span className={styles.heart_icon}>
          <FavoriteIcon fontSize="inherit" />
        </span>
        Diary
      </h1>
    </Link>
  );
};

export default Title;
