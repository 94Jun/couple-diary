import { formatDate } from "../../common";
import styles from "./MemoryCard.module.css";
const MemoryCard = ({ memory }) => {
  const { memory_id, title, content, memory_date, photos, tags } = memory;
  const date = formatDate(new Date(memory_date)).slice(0, 11);
  return (
    <div style={{ margin: "20px" }}>
      <p>사진 : {photos && photos[0]?.photo_url}</p>
      <p>타이틀 : {title}</p>
      <p>내용 : {content}</p>
      <p>일자 : {date}</p>
      {tags && tags.map((tag) => <span key={tag.tag_id}>#{tag.tag_name} </span>)}
    </div>
  );
};

export default MemoryCard;
