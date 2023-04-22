import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MemoryView.module.css";
import { formatDate } from "../../common";
import Loading from "../shared/Loading";
import { useNavigate } from "react-router-dom";

const MemoryView = () => {
  const { memory_id } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const date = memory?.memory_date !== "1899-11-29T15:32:08.000Z" ? formatDate(new Date(memory?.memory_date)).slice(0, 14) : null;
  const photos = memory ? memory?.photos.sort((a, b) => (a.created_at >= b.created_at ? 1 : -1)) : null;

  const getMemoryByMemoryId = async (memory_id) => {
    const config = {
      url: `/api/memory?type=memory&id=${memory_id}`,
      method: "GET",
    };
    const res = await axios(config);
    if (res.data.length > 0) {
      setMemory(res.data[0]);
    } else {
      navigate("/memory");
    }
  };

  useEffect(() => {
    if (isLoading) {
      getMemoryByMemoryId(memory_id);
      setIsLoading(false);
    }
  }, []);

  const deleteMemory = async (memory_id) => {
    const config = {
      url: `/api/memory/${memory_id}`,
      method: "DELETE",
    };
    await axios(config);
  };

  const handleDeleteMemory = async () => {
    await deleteMemory(memory_id);
    navigate("/memory");
  };

  let content = <Loading />;
  if (!isLoading && memory) {
    content = (
      <div className={styles.container}>
        <h2 className={styles.title}>{memory.title}</h2>
        <p className={styles.date}>{date}</p>
        {memory.photos && (
          <div className={styles.image}>
            <img src={photos[0].photo_url} alt="Memory" />
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
        <div className={styles.btn_wrap}>
          <Link to={`/memory/edit/${memory_id}`}>
            <button>수정</button>
          </Link>
          <button onClick={handleDeleteMemory}>삭제</button>
        </div>
      </div>
    );
  }

  return content;
};

export default MemoryView;
