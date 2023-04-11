import styles from "./ScheduleCard.module.css";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import useToggle from "../../hooks/useToggle";

const ScheduleCard = ({ schedule }) => {
  const [showContent, toggleContent] = useToggle(false);
  return (
    <div key={schedule.schedule_id} className={styles.schedules_wrap}>
      <div className={styles.schedule_header}>
        <div className={styles.schedule_title}>{schedule.title}</div>
        <div className={styles.schedule}>
          <span className={styles.clock_icon_wrap}>
            <ScheduleIcon fontSize="inheirt" color="inherit" />
          </span>
          <span>{schedule.schedule_time.slice(0, 5)}</span>
          {schedule.content &&
            (showContent ? (
              <span className={styles.toggle_icon_wrap} onClick={toggleContent}>
                <ArrowDropUpIcon fontSize="inheirt" color="inherit" />
              </span>
            ) : (
              <span className={styles.toggle_icon_wrap} onClick={toggleContent}>
                <ArrowDropDownIcon fontSize="inheirt" color="inherit" />
              </span>
            ))}
        </div>
      </div>
      {schedule.content && showContent && <div className={styles.content}>{schedule.content}</div>}
    </div>
  );
};

export default ScheduleCard;
