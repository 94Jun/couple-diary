import { Link } from "react-router-dom";
import { formatDate } from "../../common";
import styles from "./MemoryCard.module.css";
import { useSelector } from "react-redux";
const MemoryCard = ({ memory }) => {
  const { memory_id, title, content, memory_date, photos, tags } = memory;
  const date = memory_date !== "1899-11-29T15:32:08.000Z" ? formatDate(new Date(memory_date)).slice(0, 14) : null;
  const sortedPhotos = photos ? photos.sort((a, b) => (a.created_at >= b.created_at ? 1 : -1)) : null;
  const mainPhoto = sortedPhotos ? sortedPhotos[0].photo_url : "https://couple-diary.s3.ap-northeast-2.amazonaws.com/assets/logo_1.svg";

  return (
    <div className={styles.card}>
      <Link to={`/memory/${memory_id}`}>
        <div className={styles.image}>
          <img src={mainPhoto} alt="Memory" />
        </div>
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
