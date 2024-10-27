import styles from "../styles/Home.module.css";
import AnnoncesPage from "../pages/AnnoncesPage";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            className={styles.imageFond}
            src="https://res.cloudinary.com/dnr5cehaa/image/upload/v1729874685/image37_xi5sfs.png"
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
          </div>
          <div className={styles.imgDsn}>
            <img
              className={styles.imageDsn}
              src="https://res.cloudinary.com/dnr5cehaa/image/upload/v1729874724/image22_elokz1.jpg"
              alt="logo"
            />
          </div>
        </div>
        <div className={styles.imageAnime}>
          <p className={styles.textHappy}>
            Happy swim, Deux façons de rendre les gens heureux!
          </p>
        </div>
      </div>
      <div className={styles.containerAnnonce}>
        <AnnoncesPage />
      </div>
    </div>
  );
}
