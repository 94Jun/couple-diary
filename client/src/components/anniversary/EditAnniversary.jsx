import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../shared/Loading";
import styles from "./AddAdditionalAnniversary.module.css";
import CancelButton from "../shared/button/CancelButton";
import MainButton from "../shared/button/MainButton";

const EditAnniversary = () => {
  const { anniversary_id } = useParams();
  const navigate = useNavigate();
  const [anniversary, setAnniversary] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [eventDate, setEventDate] = useState();
  const [eventName, setEventName] = useState();

  const getAnniversaryById = async (anniversary_id) => {
    const config = {
      url: `/api/anniversary/${anniversary_id}`,
      method: "GET",
    };
    const res = await axios(config);
    if (res.data.length > 0) {
      return res.data[0];
    } else {
      navigate("/anniversary");
      return;
    }
  };

  const fetchAnniversary = async (anniversary_id) => {
    const loadedAnniversary = await getAnniversaryById(anniversary_id);
    if (loadedAnniversary) {
      setAnniversary(loadedAnniversary);
      const { event_date } = loadedAnniversary;
      const date = new Date(event_date.slice(0, 4), Number(event_date.slice(5, 7) - 1), Number(event_date.slice(8, 10)) + 1, 9).toISOString().slice(0, 10);
      setEventDate(date);
      setEventName(loadedAnniversary.event_name);
    } else {
      return;
    }
  };

  const fetchData = async (anniversary_id) => {
    await fetchAnniversary(anniversary_id);
    setIsLoading(false);
  };

  const updateAnniversary = async (anniversary_id) => {
    const config = {
      url: `/api/anniversary/${anniversary_id}`,
      method: "PUT",
      data: { event_name: eventName, event_date: eventDate },
    };
    await axios(config);
  };

  useEffect(() => {
    fetchData(anniversary_id);
  }, []);

  const handleEditAnniversary = async (e) => {
    e.preventDefault();
    await updateAnniversary(anniversary_id);
    navigate(-1);
  };

  let content = <Loading />;
  if (!isLoading) {
    content = (
      <div className={styles.container}>
        <h2 className={styles.title}>기념일 수정</h2>
        <form className={styles.form} onSubmit={handleEditAnniversary}>
          <label htmlFor="eventName">이름</label>
          {anniversary.event_name !== "시작" ? (
            <input type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
          ) : (
            <input type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} required disabled />
          )}
          <label htmlFor="eventDate">날짜</label>
          <input type="date" id="eventDate" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
          <div className={styles.btn_wrap}>
            <CancelButton type="button" onClick={() => navigate(-1)}>
              취소
            </CancelButton>
            <MainButton type="submit">기념일 수정</MainButton>
          </div>
        </form>
      </div>
    );
  }
  return content;
};

export default EditAnniversary;
