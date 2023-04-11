import styles from "./AnniversaryCard.module.css";
import { formatDate } from "../../common";

const AnniversaryCard = ({ anniversary }) => {
  const { event_name, event_date } = anniversary;
  const formattedDate = formatDate(new Date(event_date));
  const today = new Date();
  const targetDate = new Date(event_date);
  const remainingDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

  let remainingDay;
  if (remainingDays === 0) {
    remainingDay = `D-Day`;
  }
  if (remainingDays > 0) {
    remainingDay = `D-${remainingDays}`;
  }
  if (remainingDays < 0) {
    remainingDay = `D+${-remainingDays}`;
  }

  return (
    <div className={styles.card}>
      <div className={styles.event_name}>{event_name}</div>
      <div>
        <div className={styles.event_date}>{formattedDate.slice(0, 11)}</div>
        <div className={styles.remaining_day}>{remainingDay}</div>
      </div>
    </div>
  );
};

export default AnniversaryCard;
