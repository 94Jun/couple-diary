import { useState, useEffect } from "react";
import Calendar from "../calendar/Calendar";
import { useSelector } from "react-redux";
import axios from "axios";
import { addAutoAnniversaries } from "../../common";
import CalendarSchedule from "./CalendarSchedule";
import Loading from "../shared/Loading";

const Schedule = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [anniversaries, setAnniversaries] = useState();
  const [schedules, setSchedules] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const updatedAnniversaries = addAutoAnniversaries(anniversaries);
  const anniversarydates = updatedAnniversaries?.map((ann) => {
    const date = new Date(ann.event_date);
    return date;
  });

  /** couple_id를 통해 anniversaries 테이블 GET */
  const getAnniversaries = async (couple_id) => {
    const config = {
      url: `/api/anniversary/couple/${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data;
  };

  /** 받아온 anniversaries 테이블 setState */
  const fetchAnniversaries = async (couple_id) => {
    const lodedAnniversaries = await getAnniversaries(couple_id);
    setAnniversaries(lodedAnniversaries);
  };

  /** couple_id를 통해 schedules 테이블 GET */
  const getSchedules = async (couple_id) => {
    const config = {
      url: `/api/schedule/couple/${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data;
  };

  /** 받아온 schedules 테이블 setState */
  const fetchSchedules = async (couple_id) => {
    const loadedSchedules = await getSchedules(couple_id);
    setSchedules(loadedSchedules);
  };

  const fetchData = async () => {
    await fetchAnniversaries(userInfo.couple_id);
    await fetchSchedules(userInfo.couple_id);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      fetchData();
    }
  }, [userInfo]);

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };

  let content = <Loading />;
  if (!isLoading) {
    content = (
      <div className="container">
        <Calendar selectedDate={selectedDate} handleSelectedDate={handleSelectedDate} anniversaries={anniversarydates} schedules={schedules} />
        <CalendarSchedule anniversaries={updatedAnniversaries} selectedDate={selectedDate} schedules={schedules} />
      </div>
    );
  }

  return content;
};

export default Schedule;
