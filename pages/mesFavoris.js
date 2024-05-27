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
            <div className={styles.card} key={i}>
              <h2>{heart.titre}</h2>
              <p>Adresse: {heart.adresse}</p>
              <p>Prix: {heart.prix}</p>
            </div>
          ))
        ) : (
          <p>Aucun favori ajouté.</p>
        )}
      </div>
    </div>
  );
};

export default MesFavoris;
