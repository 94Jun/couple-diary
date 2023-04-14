import ScheduleCard from "./ScheduleCard";
import styles from "./DailySchedule.module.css";

const DailySchedule = ({ schedules, editMode, fetchData }) => {
  const date = Object.keys(schedules);
  return (
    <div className={styles.container}>
      <h4>{date}</h4>
      {schedules &&
        schedules[date].map((schedule) => {
          return <ScheduleCard key={schedule.schedule_id} schedule={schedule} editMode={editMode} fetchData={fetchData}/>;
        })}
    </div>
  );
};

export default DailySchedule;
