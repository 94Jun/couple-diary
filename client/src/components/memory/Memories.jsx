import axios from "axios";
import { useState, useEffect } from "react";
import MemoryCard from "./MemoryCard";
import styles from "./Memories.module.css";
import { useSelector } from "react-redux";
import Loading from "../shared/Loading";
import useToggle from "../../hooks/useToggle";
import MemoryHeader from "./MemoryHeader";

const Memories = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [memories, setMemories] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, toggleEditMode] = useToggle(false);

  // 스크롤을 통한 로딩 구현 필요
  /** coupleId로 memories 불러오기 */
  const getMemoriesByCoupeId = async (couple_id) => {
    const config = {
      url: `/api/memory?type=couple&id=${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data;
  };

  const fetchMemories = async (couple_id) => {
    const loadedMemories = await getMemoriesByCoupeId(couple_id);
    setMemories(loadedMemories);
  };

  const fetchData = async (couple_id) => {
    await fetchMemories(couple_id);
    setIsLoading(false);
  };

  /** 렌더 시 memory 테이블 불러오기 */
  useEffect(() => {
    if (userInfo) {
      fetchData(userInfo.couple_id);
    }
  }, [userInfo]);

  let content = <Loading />;
  if (!isLoading) {
    content = (
      <div className={styles.container}>
        <MemoryHeader toggleEditMode={toggleEditMode} />
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
      </div>
    );
  }

  return content;
};

export default Memories;
