import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/MesFavoris.module.css";

const MesFavoris = ({ annonces, removeFromFavorites }) => {
  console.log("Props reçues dans MesFavoris :", annonces);

  if (!annonces || annonces.length === 0) {
    return <p>Aucun favori trouvé</p>;
  }

  return (
    <div className={styles.annonceContainer}>
      {annonces.map((annonce) => (
        <div className={styles.card} key={annonce._id}>
          <img
            className={styles.imageFond}
            src="https://res.cloudinary.com/dnr5cehaa/image/upload/v1729874685/image37_xi5sfs.png"
            alt={annonce.titre}
          />
          <div className={styles.info}>
            <h2>{annonce.titre}</h2>
            <p>Ville : {annonce.ville}</p>
            <p>Prix : {annonce.prix} €</p>
          </div>
          <div className={styles.heartIcon}>
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => removeFromFavorites(annonce)} // Retire le favori
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MesFavoris;
