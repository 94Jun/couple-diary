import axios from "axios";
import { useState, useEffect } from "react";
import MemoryCard from "./MemoryCard";
import styles from "./Memories.module.css";
import { useSelector } from "react-redux";
const Memories = () => {
  const [memories, setMemories] = useState();
  const userInfo = useSelector((state) => state.login.userInfo);

  /** meories GET 요청 */
  const getMemories = async (couple_id) => {
    const config = {
      url: `/api/memory/${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    setMemories(res.data);
  };

  useEffect(() => {
    if (userInfo) {
      getMemories(userInfo.couple_id);
    }
  }, [userInfo]);

  return (
    <div className={styles.contianer}>
      {memories &&
        memories.length > 0 &&
        memories.map((memory) => {
          return (
            <div key={memory.memory_id}>
              <MemoryCard memory={memory} />
            </div>
          );
        })}
    </div>
  );
};

export default Memories;
