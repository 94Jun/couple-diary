import { formatDate } from "../../common";
import MyLink from "./MyLink";
import styles from "./ScheduleLink.module.css";
const ScheduleLink = ({ schedules }) => {
  const formattedDate = formatDate(new Date()).slice(3, 14);

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.today}>
          <div className={styles.today_card}>
            <div className={styles.card_content}>
              <div className={styles.date}>{formattedDate}</div>
              <div className={styles.length_wrap}>
                <span className={styles.length}>{schedules.length}</span>
                <span>개의 일정</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.link}>
          <ul className={styles.link_list}>
            <MyLink to="/schedule/add">일정 등록</MyLink>
            <MyLink to="/schedule/all">일정 확인</MyLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScheduleLink;
