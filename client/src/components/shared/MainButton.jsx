import styles from "./MainButton.module.css";
const MainButton = (props) => {
  return (
    <button className={`${props.className} ${styles.button}`} style={props.style} onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
};

export default MainButton;
