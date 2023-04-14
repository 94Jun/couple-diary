import { Link } from "react-router-dom";
import { formatDate } from "../../common";
import styles from "./CalendarSchedule.module.css";
import ScheduleCard from "./ScheduleCard";
import AnniversaryCard from "../anniversary/AnniversaryCard";

const CalendarSchedule = ({ selectedDate, anniversaries, schedules }) => {
  const formattedDate = formatDate(new Date(selectedDate.toISOString())).slice(0, 11);
  const dailyAnniversaries = anniversaries?.filter((ann) => {
    return new Date(ann.event_date).toDateString() === selectedDate.toDateString();
  });
  const dailySchedules = schedules?.filter((schedule) => {
    return new Date(schedule.schedule_date).toDateString() === selectedDate.toDateString();
  });

  const dateParams = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 9).toISOString().slice(0, 10);

  return (
    <div className={styles.container}>
      <h3 className={styles.date}>{formattedDate}</h3>
      <div>
        <div className={styles.title_wrap}>
          <h4 className={styles.title}>기념일</h4>
          <div className={styles.add}>
            <Link to={`/anniversary/add/${dateParams}`}>+ 기념일 등록하기</Link>
          </div>
        </div>
        {dailyAnniversaries &&
          dailyAnniversaries.length > 0 &&
          dailyAnniversaries.map((ann) => {
            return <AnniversaryCard key={ann.anniversary_id} anniversary={ann} />;
          })}
      </div>
      <div>
        <div className={styles.title_wrap}>
          <h4 className={styles.title}>일정</h4>
          <div className={styles.add}>
            <Link to={`/schedule/add/${dateParams}`}>+ 일정 등록하기</Link>
          </div>
        </div>
        {dailySchedules &&
          dailySchedules.length > 0 &&
          dailySchedules.map((schedule) => {
            return <ScheduleCard key={schedule.schedule_id} schedule={schedule} />;
          })}
      </div>
    </div>
  );
};

export default CalendarSchedule;
