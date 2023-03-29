import { formatDate } from "../../common";
import styles from "./MemoryCard.module.css";
const MemoryCard = ({ memory }) => {
  const { memory_id, title, content, memory_date, photos, tags } = memory;
  const date = formatDate(new Date(memory_date)).slice(0, 11);
  return (
    <div className={styles.card}>
      {photos && (
        <div className={styles.image}>
          <img src={photos[0].photo_url} alt="Memory" />
        </div>
      )}
      <div className={styles.title}>{title}</div>
      <div className={styles.date}>{date}</div>
      <div className={styles.tags}>
        {tags &&
          tags.map((tag) => (
            <span key={tag.tag_id} className={styles.tag}>
              #{tag.tag_name}
            </span>
          ))}
      </div>
    </div>
  );
};

export default MemoryCard;
