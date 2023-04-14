import Title from "./Title";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Header.module.css";
import { useDispatch } from "react-redux";
import { modalActions } from "../../modules/modalSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <Title />
      <div className={styles.icon_wrap} onClick={() => dispatch(modalActions.OPEN_MODAL("menu"))}>
        <MenuIcon color="inherit" fontSize="inherit" />
      </div>
    </div>
  );
};
export default Header;
