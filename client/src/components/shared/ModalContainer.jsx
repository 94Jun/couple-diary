import { createPortal } from "react-dom";
import styles from "./ModalContainer.module.css";
const ModalContainer = (props) => {
  return createPortal(<div className={styles.modal_container}>{props.children}</div>, document.getElementById("modal-root"));
};

export default ModalContainer;
