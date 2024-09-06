import React from "react";
import { useSelector } from "react-redux"; // Importe le hook useSelector de react-redux pour accéder au state Redux
import styles from "../styles/MesFavoris.module.css"; // Importe les styles CSS spécifiques à ce composant

// Définit le composant fonctionnel MesFavoris
const MesFavoris = () => {
  // Récupère les favoris depuis le state Redux
  const favoris = useSelector((state) => state.mesFavoris.value);

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Mes Favoris</h1>
      <div className={styles.container}>
        {favoris.length > 0 ? ( // Si des favoris existent
          // Map sur favoris pour afficher chaque favori
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
export default MesFavoris; // Exporte le composant MesFavoris par défaut
