import styles from "./LinkButton.module.css";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
const LinkButton = (props) => {
  return (
    <Link to={props.url}>
      <div className={styles.icon_wrap}>
        <AddIcon fontSize="inherit" color="inherit" />
        <span>{props.children}</span>
      </div>
    </Link>
  );
};

export default LinkButton;
