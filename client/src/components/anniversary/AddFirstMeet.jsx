import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MainButton from "../shared/button/MainButton";
import styles from "./AddFirstMeet.module.css";
import { useNavigate } from "react-router-dom";
import CancelButton from "../shared/button/CancelButton";

const AddFirstMeet = ({ dateParams }) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.login.userInfo);
  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (date) {
      const data = {
        couple_id: userInfo.couple_id,
        event_name: "시작",
        event_date: new Date(date).toISOString(),
      };
      const config = {
        url: "/api/anniversary",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      await axios(config);
      setDate("");
      navigate("/anniversary");
    } else {
      alert("날짜를 입력해주세요.");
    }
  };

  useEffect(() => {
    if (dateParams) {
      setDate(dateParams);
    }
  }, [dateParams]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>시작 날짜 등록</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="firstMeetDate">처음 만난 날</label>
        <input type="date" id="firstMeetDate" value={date} onChange={handleDateChange} max={new Date().toISOString().slice(0, 10)} />
        <div className={styles.btn_wrap}>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            취소
          </CancelButton>
          <MainButton className={styles.submitBtn}>기념일 추가</MainButton>
        </div>
      </form>
    </div>
  );
};

export default AddFirstMeet;
