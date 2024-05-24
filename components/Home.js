import styles from "../styles/Home.module.css";
import Annonce from "../components/Annonce";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            className={styles.imageFond}
            src="image/image37.png"
            alt="image"
          />
        </div>
        <div className={styles.annonce}>
          <div className={styles.logo}>
            <img className={styles.logoh} src="/logoh.png" alt="logo" />
          </div>
          <div className={styles.h1H2}>
            <h1 className={styles.h1}>Le bonheur est partagé</h1>
            <h2 className={styles.h2}>
              Vous avez la possibilité de louer une piscine privée partout en
              France
            </h2>
            {/* <p>Happy swim, Deux façons de rendre les gens heureux!</p> */}
          </div>
          <div className={styles.imgDsn}>
            <img
              className={styles.imageDsn}
              src="image/image22.jpg"
              alt="logo"
            />
          </div>
        </div>
      </div>
      <div className={styles.containerAnnonce}>
        <Annonce />
      </div>
    </div>
  );
}
