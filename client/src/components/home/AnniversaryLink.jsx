import { calcRemainingDay, formatDate } from "../../common";
import styles from "./AnniversaryLink.module.css";
import MyLink from "./MyLink";
const AnniversaryLink = ({ anniversary }) => {
  const remainingDay = calcRemainingDay(anniversary?.event_date);
  const formattedDate = formatDate(new Date(anniversary?.event_date)).slice(0, 14);

  let element = (
    <div className={styles.none}>
      <p>기념일을</p>
      <p>등록해주세요.</p>
    </div>
  );
  if (anniversary) {
    element = (
      <div className={styles.card_content}>
        <div className={styles.remaining_wrap}>
          <p className={styles.remaining}>{remainingDay}</p>
        </div>
        <p className={styles.event_name}>{anniversary.event_name}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.upcomming}>
          <div className={styles.upcomming_card}>{element}</div>
        </div>
        <div className={styles.link}>
          <ul className={styles.link_list}>
            <MyLink to="/anniversary/add">기념일 등록</MyLink>
            <MyLink to="/anniversary">기념일 확인</MyLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnniversaryLink;
