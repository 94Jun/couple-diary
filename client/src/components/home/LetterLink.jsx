import styles from "./LetterLink.module.css";
import MyLink from "./MyLink";
const LetterLink = ({ letters }) => {
  const text = letters.length > 0 ? "New" : "-";
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.unread}>
          <div className={styles.unread_card}>
            <div className={styles.unread_content}>
              <p className={`${styles.text} ${text === "New" && styles.new}`}>{text}</p>
            </div>
          </div>
        </div>
        <div className={styles.link}>
          <ul className={styles.link_list}>
            <MyLink to="/letter/add">편지 쓰기</MyLink>
            <MyLink to="/letter">편지 읽기</MyLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LetterLink;
