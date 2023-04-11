import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import AnniversaryCard from "./AnniversaryCard";
import styles from "./Anniversary.module.css";
import useToggle from "../../hooks/useToggle";
import { addAutoAnniversaries } from "../../common";

const Anniversary = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [anniversaries, setAnniversaries] = useState();
  const updatedAnniversaries = addAutoAnniversaries(anniversaries);
  const [showPastAnniversaries, togglePastAnniversaries] = useToggle(false);

  /** couple_id를 통해 anniversaries 테이블 GET */
  const getAnniversaries = async (couple_id) => {
    const config = {
      url: `/api/anniversary/${couple_id}`,
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

  useEffect(() => {
    if (userInfo) {
      fetchAnniversaries(userInfo.couple_id);
    }
  }, [userInfo]);

  const today = new Date().setHours(0, 0, 0, 0);
  const upcomingAnniversaries = updatedAnniversaries?.filter((ann) => new Date(ann.event_date).setHours(0, 0, 0, 0) >= today);
  const pastAnniversaries = updatedAnniversaries?.filter((ann) => new Date(ann.event_date).setHours(0, 0, 0, 0) < today);

  return (
    <div className={styles.container}>
      <div className={styles.past_anniversaries_toggle} onClick={togglePastAnniversaries}>
        지난 기념일 {showPastAnniversaries ? "숨기기" : "보기"}
      </div>
      {showPastAnniversaries && <>{pastAnniversaries && pastAnniversaries.map((ann) => <AnniversaryCard key={ann.anniversary_id} anniversary={ann} />)}</>}
      {upcomingAnniversaries && upcomingAnniversaries.map((ann) => <AnniversaryCard key={ann.anniversary_id} anniversary={ann} />)}
    </div>
  );
};

export default Anniversary;
