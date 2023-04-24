import Title from "../components/shared/Title";
import styles from "./RequireLoginPage.module.css";
import Login from "../components/login/Login";
const RequireLoginPage = () => {
  return (
    <div className="">
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.title}>
            <Title />
          </div>
          <div className={styles.footer}>
            <div className={styles.button}>
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequireLoginPage;
