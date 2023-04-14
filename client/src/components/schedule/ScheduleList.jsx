import styles from "./ScheduleList.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LinkButton from "../shared/button/LinkButton";
import { divideSchedule, divideScheduleByNow } from "../../common";
import DailySchedule from "./DailySchedule";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import useToggle from "../../hooks/useToggle";
const ScheduleList = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [schedules, setSchedules] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [preIsVisible, togglePreIsVisible] = useToggle(false);
  const [nextIsVisible, toggleNextIsVisible] = useToggle(true);

  // 일자별로 현재 기준 일정 구분
  const dividedSchedules = divideSchedule(schedules);
  const preSchedules = divideScheduleByNow(dividedSchedules, false);
  const nextSchedules = divideScheduleByNow(dividedSchedules, true);

  /** couple_id를 통해 schedules 테이블 GET */
  const getSchedules = async (couple_id) => {
    const config = {
      url: `/api/schedule/${couple_id}`,
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

  const fetchData = async (couple_id) => {
    await fetchSchedules(couple_id);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      fetchData(userInfo.couple_id);
    }
  }, [userInfo]);

  let content;
  if (!isLoading) {
    content = (
      <div className={styles.container}>
        <LinkButton url="/schedule/add">일정 등록</LinkButton>
        <div className={styles.schedule_wrap}>
          <div className={styles.schedule_header}>
            <h4>지난 일정</h4>
            <div onClick={togglePreIsVisible}>
              {preIsVisible ? <ArrowDropUpIcon fontSize="inherit" color="inherit" /> : <ArrowDropDownIcon fontSize="inherit" color="inherit" />}
            </div>
          </div>
          {preIsVisible &&
            preSchedules &&
            preSchedules.length > 0 &&
            preSchedules.map((schedule, idx) => {
              return <DailySchedule key={idx} schedules={schedule} />;
            })}
        </div>
        <div className={styles.schedule_wrap}>
          <div className={styles.schedule_header}>
            <h4>일정</h4>
            <div onClick={toggleNextIsVisible}>
              {nextIsVisible ? <ArrowDropUpIcon fontSize="inherit" color="inherit" /> : <ArrowDropDownIcon fontSize="inherit" color="inherit" />}
            </div>
          </div>
          {nextIsVisible &&
            nextSchedules &&
            nextSchedules.length > 0 &&
            nextSchedules.map((schedule, idx) => {
              return <DailySchedule key={idx} schedules={schedule} />;
            })}
        </div>
      </div>
    );
  }
  return content;
};

export default ScheduleList;
