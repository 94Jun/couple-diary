import styles from "./ScheduleCard.module.css";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import useToggle from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector } from "react-redux";

const ScheduleCard = ({ schedule, editMode, fetchData }) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.login.userInfo);
  const [showContent, toggleContent] = useToggle(false);

  const deleteSchedule = async () => {
    const config = {
      url: `/api/schedule/${schedule.schedule_id}`,
      method: "DELETE",
    };
    await axios(config);
    fetchData(userInfo.couple_id);
  };

  return (
    <div key={schedule.schedule_id} className={styles.schedules_wrap}>
      <div className={styles.schedule_header}>
        <div className={styles.schedule_title}>{schedule.title}</div>
        <div className={styles.schedule}>
          <span className={styles.clock_icon_wrap}>
            <ScheduleIcon fontSize="inheirt" color="inherit" />
          </span>
          <span>{schedule?.schedule_time?.slice(0, 5)}</span>
          {schedule.content &&
            (showContent ? (
              <button className={styles.toggle_icon_wrap} onClick={toggleContent}>
                <ArrowDropUpIcon fontSize="inheirt" color="inherit" />
              </button>
            ) : (
              <button className={styles.toggle_icon_wrap} onClick={toggleContent}>
                <ArrowDropDownIcon fontSize="inheirt" color="inherit" />
              </button>
            ))}
        </div>
      </div>
      {schedule.content && showContent && <div className={styles.content}>{schedule.content}</div>}
      {editMode && (
        <div className={styles.edit_wrap}>
          <button onClick={() => navigate(`/schedule/edit/${schedule.schedule_id}`)}>
            <EditIcon fontSize="inherit" color="inherit" />
          </button>
          <button onClick={deleteSchedule}>
            <DeleteIcon fontSize="inherit" color="inherit" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleCard;
