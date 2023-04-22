import Backdrop from "./Backdrop";
import ModalContainer from "./ModalContainer";
import { useSelector, useDispatch } from "react-redux";
import Login from "../../login/Login";
import { modalActions } from "../../../modules/modalSlice";
import CoupleRegister from "../../couple/CoupleRegister";
import NavBar from "../NavBar";
import DisconnectModal from "../../couple/DisconnectModal";
import LetterView from "../../letter/LetterView";
import { useEffect } from "react";

const Modal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.modal.activeModal);
  
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <Backdrop onClick={() => dispatch(modalActions.CLOSE_MODAL())}>
      <ModalContainer>
        {activeModal === "login" && <Login />}
        {activeModal === "register" && <CoupleRegister />}
        {activeModal === "menu" && <NavBar />}
        {activeModal === "disconnect" && <DisconnectModal />}
        {activeModal === "letter" && <LetterView />}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
