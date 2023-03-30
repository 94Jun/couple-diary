import { Link } from "react-router-dom";
import { formatDate } from "../../common";
import styles from "./MemoryCard.module.css";
const MemoryCard = ({ memory }) => {
  const { memory_id, title, content, memory_date, photos, tags } = memory;
  const date = memory_date !== "1899-11-29T15:32:08.000Z" ? formatDate(new Date(memory_date)).slice(0, 11) : null;
  return (
    <div className={styles.card}>
      <Link to={`/memory/${memory_id}`}>
        {photos && (
          <div className={styles.image}>
            <img src={photos[0].photo_url} alt="Memory" />
          </div>
        )}
        <div className={styles.title}>{title !== "null" ? title : "제목없음"}</div>
        <div className={styles.date}>{date}</div>
        <div className={styles.tags}>
          {tags &&
            tags.map((tag) => (
              <span key={tag.tag_id} className={styles.tag}>
                {tag.tag_name}
              </span>
            ))}
        </div>
      </Link>
    </div>
  );
};

export default MemoryCard;
