import styles from "./AnniversaryCard.module.css";
import { formatDate } from "../../common";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calcRemainingDay } from "../../common";

const AnniversaryCard = ({ anniversary, editMode, fetchData }) => {
  const { event_name, event_date } = anniversary;
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.login.userInfo);
  const formattedDate = formatDate(new Date(event_date));
  const remainingDay = calcRemainingDay(event_date);

  const deleteAnniversary = async () => {
    const config = {
      url: `/api/anniversary/${anniversary.anniversary_id}`,
      method: "DELETE",
    };
    await axios(config);
    fetchData(userInfo.couple_id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <div className={styles.event_name}>{event_name}</div>
        <div>
          <div className={styles.remaining_day}>{remainingDay}</div>
          <div className={styles.event_date}>{formattedDate.slice(0, 14)}</div>
        </div>
      </div>
      {editMode && !anniversary.isAuto && (
        <div className={styles.edit_wrap}>
          <button onClick={() => navigate(`/anniversary/edit/${anniversary.anniversary_id}`)}>
            <EditIcon fontSize="inherit" color="inherit" />
          </button>
          {anniversary.event_name !== "시작" && (
            <button onClick={deleteAnniversary}>
              <DeleteIcon fontSize="inherit" color="inherit" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AnniversaryCard;
