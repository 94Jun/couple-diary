import { createPortal } from "react-dom";
import styles from "./ModalContainer.module.css";
const ModalContainer = ({ children }) => {
  return createPortal(<div className={styles.modal_container}>{children}</div>, document.getElementById("modal-root"));
};

export default ModalContainer;
