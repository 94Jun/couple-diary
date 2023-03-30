import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MemoryView.module.css";
import { formatDate } from "../../common";

const MemoryView = () => {
  const { memory_id } = useParams();
  const [memory, setMemory] = useState();
  const date = memory?.memory_date !== "1899-11-29T15:32:08.000Z" ? formatDate(new Date(memory?.memory_date)).slice(0, 11) : null;

  const getMemoryByMemoryId = async (memory_id) => {
    const config = {
      url: `/api/memory?type=memory&id=${memory_id}`,
      method: "GET",
    };
    const res = await axios(config);
    setMemory(res.data[0]);
  };

  useEffect(() => {
    getMemoryByMemoryId(memory_id);
  }, []);

  return (
    <div className={styles.container}>
      {memory && (
        <>
          <h2 className={styles.title}>{memory.title}</h2>
          <p className={styles.date}>{date}</p>
          {memory.photos && (
            <div className={styles.image}>
              <img src={memory.photos[0].photo_url} alt="Memory" />
            </div>
          )}
          <div className={styles.tags}>
            {memory.tags &&
              memory.tags.map((tag) => (
                <span key={tag.tag_id} className={styles.tag}>
                  {tag.tag_name}
                </span>
              ))}
          </div>
          <div className={styles.content}>{memory.content}</div>
        </>
      )}
    </div>
  );
};

export default MemoryView;
