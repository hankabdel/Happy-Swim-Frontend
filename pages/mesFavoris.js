import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/MesFavoris.module.css";

const MesFavoris = () => {
  const favoris = useSelector((state) => state.mesFavoris.value);
  console.log("Mes favoris:", favoris);

  return (
    <div className={styles.main}>
      <h1>Mes Favoris</h1>
      <div className={styles.container}>
        {favoris.length > 0 ? (
          favoris.map((heart, i) => (
            <div className={styles.annonceContainer} key={i}>
              <div className={styles.card}>
                <img
                  className={styles.imageFond}
                  src="image/image37.png"
                  alt="image"
                />
                <div className={styles.info}>
                  <h2>{heart.titre}</h2>
                  <p>ville: {heart.ville}</p>
                  <p>Prix: {heart.prix}</p>
                </div>
              </div>
              <div className={styles.cardScroll}></div>
            </div>
          ))
        ) : (
          <div className={styles.p}>
            <p>Aucun favori trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesFavoris;
