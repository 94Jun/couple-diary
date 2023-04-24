import Banner from "./Banner";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import { addAutoAnniversaries } from "../../common";
import NavCard from "./NavCard";

const Home = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [anniversaries, setAnniversaries] = useState();
  const [schedules, setSchedules] = useState();
  const [letters, setLetters] = useState();
  const updatedAnniversaries = addAutoAnniversaries(anniversaries);
  const today = new Date().setHours(0, 0, 0, 0);
  const upcomingAnniversaries = updatedAnniversaries?.filter((ann) => new Date(ann.event_date).setHours(0, 0, 0, 0) >= today) || [];
  const start = anniversaries?.find((ann) => ann.event_name === "시작");
  const todaySchedules = schedules?.filter((schedule) => new Date(schedule.schedule_date).setHours(0, 0, 0, 0) === today) || [];
  const unreadLetters = letters?.filter((letter) => {
    return letter.user_id === userInfo.couple_user_info?.user_id && letter.readers?.findIndex((reader) => reader.user_id === userInfo.user_id) === -1;
  });

  /** couple_id로 anniversaries 테이블 GET */
  const getAnniversaries = async (couple_id) => {
    const config = {
      url: `/api/anniversary/couple/${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data;
  };

  /** couple_id로 schedules 테이블 GET */
  const getSchedules = async (couple_id) => {
    const config = {
      url: `/api/schedule/couple/${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data;
  };

  /** couple_id로 letters 테이블 GET */
  const getLettersByCoupleId = async (couple_id) => {
    const config = {
      url: `/api/letter/${couple_id}`,
      method: "GET",
    };
    const res = await axios(config);
    return res.data;
  };

  /** anniversaries setState */
  const fetchAnniversaries = async (couple_id) => {
    const loadedAnniversaries = await getAnniversaries(couple_id);
    setAnniversaries(loadedAnniversaries);
  };

  /** shcedules setState */
  const fetchShcedules = async (couple_id) => {
    const loadedSchedules = await getSchedules(couple_id);
    setSchedules(loadedSchedules);
  };

  /** letters setState */
  const fetchLetters = async (couple_id) => {
    const loadedLetters = await getLettersByCoupleId(couple_id);
    setLetters(loadedLetters);
  };

  /** loading state change */
  const fetchData = async (couple_id) => {
    await fetchAnniversaries(couple_id);
    await fetchShcedules(couple_id);
    await fetchLetters(couple_id);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      fetchData(userInfo.couple_id);
    }
  }, [userInfo]);

  let content = <Loading />;
  if (!isLoading) {
    if (userInfo) {
      content = (
        <div>
          <Banner userInfo={userInfo} start={start} />
          <NavCard anniversary={upcomingAnniversaries[0]} schedules={todaySchedules} letters={unreadLetters} />
        </div>
      );
    } else {
      content = "커플 등록";
    }
  }

  return content;
};

export default Home;
