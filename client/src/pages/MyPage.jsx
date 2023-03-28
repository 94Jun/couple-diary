import CoupleSettings from "../components/settings/CoupleSettings";
import PersonalSettings from "../components/settings/PersonalSettings";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MyPage = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (userInfo) {
      setIsLoading(false);
    }
  }, [userInfo]);
  let content;
  if (isLoading === false) {
    content = (
      <div>
        <PersonalSettings />
      </div>
    );
  }

  if (isLoading === false && userInfo.is_couple) {
    content = (
      <div>
        <PersonalSettings />
        <CoupleSettings />
      </div>
    );
  }
  return content;
};

export default MyPage;
