import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AddAdditionalAnniversary.module.css";
import MainButton from "../shared/button/MainButton";
import CancelButton from "../shared/button/CancelButton";

const AddAdditionalAnniversary = ({ dateParams }) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.login.userInfo);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.is_couple) {
      if (eventDate && eventName) {
        const data = {
          couple_id: userInfo.couple_id,
          event_name: eventName,
          event_date: eventDate,
        };
        const config = {
          url: "/api/anniversary",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: data,
        };
        await axios(config);
        setEventName("");
        setEventDate("");
        navigate(-1);
      } else {
        alert("기념일 이름과 날짜를 입력해주세요.");
      }
    } else {
      alert("커플 등록이 필요합니다.");
    }
  };

  useEffect(() => {
    if (dateParams) {
      setEventDate(dateParams);
    }
  }, [dateParams]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>기념일 등록</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="eventName">이름</label>
        <input type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
        <label htmlFor="eventDate">날짜</label>
        <input type="date" id="eventDate" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
        <div className={styles.btn_wrap}>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            취소
          </CancelButton>
          <MainButton type="submit">기념일 등록</MainButton>
        </div>
      </form>
    </div>
  );
};

export default AddAdditionalAnniversary;
