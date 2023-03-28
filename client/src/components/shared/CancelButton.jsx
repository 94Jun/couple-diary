import styles from "./CancelButton.module.css";
const CancelButton = (props) => {
  return (
    <button className={`${props.className} ${styles.button}`} style={props.style} onClick={props.onClick} type="button">
      {props.children}
    </button>
  );
};

export default CancelButton;
