import Memories from "../components/memory/Memories";
import LinkButton from "../components/shared/button/LinkButton";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import styles from "./MemoryPage.module.css";
import { useState } from "react";
const MemoryPage = () => {
  const [viewType, setViewType] = useState("full");
  return (
    <div>
      <div className={styles.header}>
        <LinkButton url="/memory/add">추억 등록</LinkButton>
        <div className={styles.btn_wrap}>
          <button onClick={() => setViewType("full")}>
            <ViewStreamIcon />
          </button>
          <button onClick={() => setViewType("img")}>
            <ViewModuleIcon />
          </button>
        </div>
      </div>
      <Memories viewType={viewType} />
    </div>
  );
};

export default MemoryPage;
