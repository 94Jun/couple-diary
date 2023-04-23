import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Link } from "react-router-dom";
import styles from "./MyLink.module.css";
const MyLink = ({ to, children }) => {
  return (
    <li className={styles.container}>
      <Link to={to}>
        <div className={styles.wrap}>
          <span>{children}</span>
          <span className={styles.icon}>
            <KeyboardArrowRightOutlinedIcon fontSize="inherit" color="inherit" />
          </span>
        </div>
      </Link>
    </li>
  );
};

export default MyLink;
