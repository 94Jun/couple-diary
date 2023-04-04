import axios from "axios";
import { useState, useEffect } from "react";
import MemoryCard from "./MemoryCard";
import styles from "./Memories.module.css";
import { useSelector } from "react-redux";

const Memories = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [memories, setMemories] = useState();

  // 스크롤을 통한 로딩 구현 필요
  /** coupleId로 memories 불러오기 */
  const getMemoriesByCoupeId = async (couple_id) => {
    const config = {
      url: `/api/memory?type=couple&id=${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    setMemories(res.data);
  };
  
  /** 렌더 시 memory 테이블 불러오기 */
  useEffect(() => {
    if (userInfo) {
      getMemoriesByCoupeId(userInfo.couple_id);
    }
  }, [userInfo]);

  return (
    <div className={styles.card_container}>
      {memories &&
        memories.length > 0 &&
        memories.map((memory) => {
          return (
            <div key={memory.memory_id} className={styles.card_wrap}>
              <MemoryCard memory={memory} />
            </div>
          );
        })}
    </div>
  );
};

export default Memories;
