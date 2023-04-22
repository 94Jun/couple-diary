import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MemoryView.module.css";
import { formatDate } from "../../common";
import Loading from "../shared/Loading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MemoryView = () => {
  const { memory_id } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState();
  const date = memory?.memory_date !== "1899-11-29T15:32:08.000Z" ? formatDate(new Date(memory?.memory_date)).slice(0, 14) : null;
  const photos = memory ? memory.photos?.sort((a, b) => (a.created_at >= b.created_at ? 1 : -1)) : null;
  useEffect(() => {
    if (photos) {
      setSelectedPhoto(photos[0]);
    }
  }, [photos]);

  /** memories 테이블 GET */
  const getMemoryById = async (memory_id) => {
    const config = {
      url: `/api/memory?type=memory&id=${memory_id}`,
      method: "GET",
    };
    const res = await axios(config);
    if (res.data.length > 0) {
      return res.data[0];
    } else {
      navigate("/memory");
      return;
    }
  };

  const fetchMemory = async (memory_id) => {
    const loadedMemory = await getMemoryById(memory_id);
    setMemory(loadedMemory);
  };

  useEffect(() => {
    if (isLoading) {
      fetchMemory(memory_id);
      setIsLoading(false);
    }
  }, [memory_id]);

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
        <div className={styles.header}>
          <h3 className={styles.title}>{memory.title !== "null" ? memory.title : "제목 없음"}</h3>
          <div className={styles.edit_wrap}>
            <button onClick={() => navigate(`/memory/edit/${memory_id}`)}>
              <EditIcon fontSize="inherit" color="inherit" />
            </button>
            <button onClick={handleDeleteMemory}>
              <DeleteIcon fontSize="inherit" color="inherit" />
            </button>
          </div>
        </div>
        <div className={styles.date}>{date}</div>
        {memory.tags && (
          <div className={styles.tag_wrap}>
            {memory.tags.map((tag) => {
              return (
                <div key={tag.tag_id} className={styles.tag}>
                  {tag.tag_name}
                </div>
              );
            })}
          </div>
        )}
        {photos && selectedPhoto && (
          <div className={styles.carousel_wrap}>
            <div className={styles.carousel_main}>
              <div className={styles.main_wrap}>
                <img src={selectedPhoto?.photo_url} alt="carousel_main" />
              </div>
            </div>
            {photos.length > 1 && (
              <div className={styles.carousel_sub}>
                {photos.map((photo) => {
                  return (
                    <div
                      key={photo.photo_id}
                      className={`${styles.sub_wrap} ${photo.photo_id === selectedPhoto.photo_id ? styles.selected : ""}`}
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <img src={photo.photo_url} alt="carousel_sub" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        <p className={styles.text}>{memory.content !== "null" && memory.content}</p>
      </div>
    );
  }

  return content;
};

export default MemoryView;
