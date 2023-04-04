import Memories from "../components/memory/Memories";
import LinkButton from "../components/shared/button/LinkButton";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import styles from "./MemoryPage.module.css";
import { Link, Outlet } from "react-router-dom";
const MemoryPage = () => {
  return (
    <div>
      <div className={styles.header}>
        <LinkButton url="/memory/add">추억 등록</LinkButton>
        <div className={styles.btn_wrap}>
          <Link to="/memory">
            <ViewStreamIcon />
          </Link>
          <Link to="/memory/photo">
            <ViewModuleIcon />
          </Link>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default MemoryPage;
