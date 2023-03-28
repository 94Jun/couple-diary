import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CoupleRegister from "../components/couple/CoupleRegister";
import Backdrop from "../components/shared/Backdrop";
import MainButton from "../components/shared/MainButton";
import ModalContainer from "../components/shared/ModalContainer";
import useToggle from "../hooks/useToggle";
import styles from "./HomePage.module.css";
const HomePage = () => {
  const userInfo = useSelector((state) => state.login.userInfo);
  const [coupleRegisterModal, toggleCoupleRegisterModal] = useToggle(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (userInfo) {
      setIsLoading(false);
    }
  }, [userInfo]);

  let content;
  if ( !isLoading && !userInfo.is_couple) {
    content = (
      <div>
        <MainButton onClick={toggleCoupleRegisterModal}>커플 등록</MainButton>
        {coupleRegisterModal && (
          <Backdrop onClick={toggleCoupleRegisterModal}>
            <ModalContainer>
              <CoupleRegister toggleCoupleRegisterModal={toggleCoupleRegisterModal} />
            </ModalContainer>
          </Backdrop>
        )}
      </div>
    );
  }

  return content;
};

export default HomePage;
