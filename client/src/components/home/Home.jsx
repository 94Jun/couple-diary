import Banner from "./Banner";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import { addAutoAnniversaries } from "../../common";

const Home = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [anniversaries, setAnniversaries] = useState();
  const updatedAnniversaries = addAutoAnniversaries(anniversaries);
  const start = anniversaries?.find((ann) => ann.event_name === "시작");


  /** couple_id로 anniversaries 테이블 GET */
  const getAnniversaries = async (couple_id) => {
    const config = {
      url: `/api/anniversary/couple/${couple_id}`,
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

  /** loading state change */
  const fetchData = async (couple_id) => {
    await fetchAnniversaries(couple_id);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      fetchData(userInfo.couple_id);
    }
  }, [userInfo]);

  let content = <Loading />;
  if (!isLoading) {
    if (userInfo.couple_id) {
      content = <Banner userInfo={userInfo} start={start}/>;
    } else {
      content = "커플 등록";
    }
  }

  return content;
};

export default Home;
