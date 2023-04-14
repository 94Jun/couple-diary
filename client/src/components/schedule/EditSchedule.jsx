import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../shared/Loading";
import styles from "./AddSchedule.module.css";
import CancelButton from "../shared/button/CancelButton";
import MainButton from "../shared/button/MainButton";

const EditSchedule = () => {
  const { schedule_id } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const getScheduleById = async (schedule_id) => {
    const config = {
      url: `/api/schedule/${schedule_id}`,
      method: "GET",
    };
    const res = await axios(config);
    if (res.data.length > 0) {
      return res.data[0];
    } else {
      navigate("/schedule/all");
      return;
    }
  };

  const fetchSchedule = async (schedule_id) => {
    const loadedSchedule = await getScheduleById(schedule_id);
    if (loadedSchedule) {
      setSchedule(loadedSchedule);
      setTitle(loadedSchedule.title);
      setContent(loadedSchedule.content);
      setTime(loadedSchedule.schedule_time);
      const { schedule_date } = loadedSchedule;
      const date = new Date(schedule_date.slice(0, 4), Number(schedule_date.slice(5, 7) - 1), Number(schedule_date.slice(8, 10)) + 1, 9)
        .toISOString()
        .slice(0, 10);
      setDate(date);
    } else {
      return;
    }
  };

  const fetchData = async (schedule_id) => {
    await fetchSchedule(schedule_id);
    setIsLoading(false);
  };

  const updateSchedule = async (schedule_id) => {
    const config = {
      url: `/api/schedule/${schedule_id}`,
      method: "PUT",
      data: { title, content, schedule_date: date, schedule_time: time },
    };
    await axios(config);
  };

  useEffect(() => {
    fetchData(schedule_id);
  }, []);

  const handleEditSchedule = async (e) => {
    e.preventDefault();
    await updateSchedule(schedule_id);
    navigate(-1);
  };

  let element = <Loading />;
  if (!isLoading) {
    element = (
      <div className={styles.container}>
        <h2 className={styles.title}>일정 수정</h2>
        <form onSubmit={handleEditSchedule} className={styles.form}>
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
            <MainButton type="submit">수정하기</MainButton>
          </div>
        </form>
      </div>
    );
  }

  return element;
};

export default EditSchedule;
