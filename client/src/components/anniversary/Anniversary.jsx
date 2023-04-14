import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import AnniversaryCard from "./AnniversaryCard";
import styles from "./Anniversary.module.css";
import useToggle from "../../hooks/useToggle";
import { addAutoAnniversaries } from "../../common";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LinkButton from "../shared/button/LinkButton";
import Loading from "../shared/Loading";
import SettingsIcon from "@mui/icons-material/Settings";

const Anniversary = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [anniversaries, setAnniversaries] = useState();
  const updatedAnniversaries = addAutoAnniversaries(anniversaries);
  const [preIsVisible, togglePreIsVisible] = useToggle(false);
  const [nextIsVisible, toggleNextIsVisible] = useToggle(true);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, toggleEditMode] = useToggle(false);

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

  const fetchData = async (couple_id) => {
    await fetchAnniversaries(couple_id);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      fetchData(userInfo.couple_id);
    }
  }, [userInfo]);

  const today = new Date().setHours(0, 0, 0, 0);
  const upcomingAnniversaries = updatedAnniversaries?.filter((ann) => new Date(ann.event_date).setHours(0, 0, 0, 0) >= today);
  const pastAnniversaries = updatedAnniversaries?.filter((ann) => new Date(ann.event_date).setHours(0, 0, 0, 0) < today);

  let content = <Loading />;

  if (!isLoading) {
    content = (
      <div className={styles.container}>
        <div className={styles.header}>
          <LinkButton url="/anniversary/add">기념일 등록</LinkButton>
          <button className={styles.setting_icon} type="button" onClick={toggleEditMode}>
            <SettingsIcon fontSize="inherit" color="inherit" />
          </button>
        </div>
        <div className={styles.schedule_wrap}>
          <div className={styles.schedule_header}>
            <h4>지난 기념일</h4>
            <div onClick={togglePreIsVisible}>
              {preIsVisible ? <ArrowDropUpIcon fontSize="inherit" color="inherit" /> : <ArrowDropDownIcon fontSize="inherit" color="inherit" />}
            </div>
          </div>
          <div className={styles.card_wrap}>
            {preIsVisible &&
              pastAnniversaries &&
              pastAnniversaries.length > 0 &&
              pastAnniversaries.map((ann) => {
                return <AnniversaryCard key={ann.anniversary_id} anniversary={ann} editMode={editMode} fetchData={fetchData} />;
              })}
          </div>
        </div>
        <div className={styles.schedule_wrap}>
          <div className={styles.schedule_header}>
            <h4>기념일</h4>
            <div onClick={toggleNextIsVisible}>
              {nextIsVisible ? <ArrowDropUpIcon fontSize="inherit" color="inherit" /> : <ArrowDropDownIcon fontSize="inherit" color="inherit" />}
            </div>
          </div>
          <div className={styles.card_wrap}>
            {nextIsVisible &&
              upcomingAnniversaries &&
              upcomingAnniversaries.length > 0 &&
              upcomingAnniversaries.map((ann) => {
                return <AnniversaryCard key={ann.anniversary_id} anniversary={ann} editMode={editMode} fetchData={fetchData} />;
              })}
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default Anniversary;
