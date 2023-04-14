import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainButton from "../components/shared/button/MainButton";
import styles from "./HomePage.module.css";
import { modalActions } from "../modules/modalSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setIsLoading(false);
    }
  }, [userInfo]);

  let content;
  if (!isLoading) {
    if (!userInfo.is_couple) {
      content = (
        <div>
          <MainButton onClick={() => dispatch(modalActions.OPEN_MODAL("register"))}>커플 등록</MainButton>
        </div>
      );
    } else {
      content = (
        <div className={styles.card}>
          <div className={styles.card_header}></div>
        </div>
      );
    }
  }

  return content;
};

export default HomePage;
