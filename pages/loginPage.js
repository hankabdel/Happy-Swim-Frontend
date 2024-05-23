import styles from "../styles/LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            className={styles.imageFond}
            src="image/image27.png"
            alt="image"
          />
        </div>
      </div>
      <div className={styles.annonce}></div>
      <div className={styles.footer}></div>
    </div>
  );
}

export default LoginPage;
