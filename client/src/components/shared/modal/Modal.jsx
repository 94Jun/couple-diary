import Backdrop from "./Backdrop";
import ModalContainer from "./ModalContainer";
import { useSelector, useDispatch } from "react-redux";
import Login from "../../login/Login";
import { modalActions } from "../../../modules/modalSlice";
import CoupleRegister from "../../couple/CoupleRegister";
import NavBar from "../NavBar";
import DisconnectModal from "../../couple/DisconnectModal";

const Modal = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.modal.activeModal);

  return (
    <Backdrop onClick={() => dispatch(modalActions.CLOSE_MODAL())}>
      <ModalContainer>
        {activeModal === "login" && <Login />}
        {activeModal === "register" && <CoupleRegister />}
        {activeModal === "menu" && <NavBar />}
        {activeModal === "disconnect" && <DisconnectModal />}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
