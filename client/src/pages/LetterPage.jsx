import { Link } from "react-router-dom";
import LetterList from "../components/letter/LetterList";
import styles from "./LetterPage.module.css";
import AddIcon from "@mui/icons-material/Add";

// 커플이 아닌 경우 보여줄 데이터 추가 필요
const LetterPage = () => {
  return (
    <div>
      <Link to="/letter/write">
        <div className={styles.icon_wrap}>
          <AddIcon fontSize="inherit" color="inherit" />
          <span>편지쓰기</span>
        </div>
      </Link>
      <LetterList />
    </div>
  );
};

export default LetterPage;
