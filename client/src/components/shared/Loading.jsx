import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.animation}></div>
      <div className={styles.title}>로딩 중..</div>
    </div>
  );
};

export default Loading;
