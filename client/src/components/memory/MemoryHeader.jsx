import styles from "./MemoryHeader.module.css";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import SettingsIcon from "@mui/icons-material/Settings";
import LinkButton from "../shared/button/LinkButton";
import { Link } from "react-router-dom";
const MemoryHeader = ({ editMode, toggleEditMode, setInitial, isSetting }) => {
  const toggleMode = () => {
    if (editMode) {
      toggleEditMode();
      setInitial();
    } else {
      toggleEditMode();
    }
  };
  let element;
  if (isSetting) {
    element = (
      <div className={styles.header}>
        <div className={styles.btn_wrap}>
          <LinkButton url="/memory/add">추억 등록</LinkButton>
          <button className={styles.setting_icon} onClick={toggleMode}>
            <SettingsIcon fontSize="inherit" color="inherit" />
          </button>
        </div>
        <div className={styles.btn_wrap}>
          <Link to="/memory">
            <ViewStreamIcon />
          </Link>
          <Link to="/memory/photo">
            <ViewModuleIcon />
          </Link>
        </div>
      </div>
    );
  }
  if (!isSetting) {
    element = (
      <div className={styles.header}>
        <div className={styles.btn_wrap}>
          <LinkButton url="/memory/add">추억 등록</LinkButton>
        </div>
        <div className={styles.btn_wrap}>
          <Link to="/memory">
            <ViewStreamIcon />
          </Link>
          <Link to="/memory/photo">
            <ViewModuleIcon />
          </Link>
        </div>
      </div>
    );
  }
  return element;
};

export default MemoryHeader;
