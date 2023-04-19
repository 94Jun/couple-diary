import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import AddFirstMeet from "./AddFirstMeet";
import AddAdditionalAnniversary from "./AddAdditionalAnniversary";
import { useParams } from "react-router-dom";

const AddAnniversary = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [anniversaries, setAnniversaries] = useState();
  const { dateParams } = useParams();
  
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

  useEffect(() => {
    if (userInfo) {
      fetchAnniversaries(userInfo.couple_id);
    }
  }, [userInfo]);

  let content;
  if (anniversaries) {
    const isFirstRegistration = anniversaries?.find((ann) => ann.event_name === "시작") ? false : true;
    if (isFirstRegistration) {
      content = (
        <div>
          <AddFirstMeet dateParams={dateParams} />
        </div>
      );
    } else {
      content = (
        <div>
          <AddAdditionalAnniversary dateParams={dateParams} />
        </div>
      );
    }
  }

  return content;
};

export default AddAnniversary;
