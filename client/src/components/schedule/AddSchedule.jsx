import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./AddSchedule.module.css";
import MainButton from "../shared/button/MainButton";
import CancelButton from "../shared/button/CancelButton";

const AddSchedule = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.login.userInfo);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("00:00");
  const { dateParams } = useParams();

  const handlePostSchedule = async (e) => {
    e.preventDefault();
    if (userInfo.is_couple) {
      const config = {
        url: "/api/schedule",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          couple_id: userInfo.couple_id,
          user_id: userInfo.user_id,
          title,
          content,
          schedule_date: date,
          schedule_time: time,
        },
      };
      try {
        await axios(config);
        navigate("/schedule");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("커플 등록이 필요합니다.");
    }
  };

  useEffect(() => {
    if (dateParams) {
      setDate(dateParams);
    }
  }, [dateParams]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>일정 등록</h2>
      <form onSubmit={handlePostSchedule} className={styles.form}>
        <label htmlFor="title" className={styles.label}>
          제목
        </label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} required />
        <label htmlFor="date" className={styles.label}>
          날짜
        </label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className={styles.input} required />
        <label htmlFor="scheduleTime" className={styles.label}>
          시간
        </label>
        <input type="time" id="scheduleTime" value={time} onChange={(e) => setTime(e.target.value)} className={styles.input} required />
        <label htmlFor="content" className={styles.label}>
          내용
        </label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className={styles.textarea}></textarea>
        <div className={styles.btn_wrap}>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            취소
          </CancelButton>
          <MainButton type="submit">등록하기</MainButton>
        </div>
      </form>
    </div>
  );
};

export default AddSchedule;
