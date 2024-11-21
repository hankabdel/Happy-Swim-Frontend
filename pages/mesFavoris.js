import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react"; // Importation de React et des hooks useEffect et useState
import styles from "../styles/MesFavoris.module.css";

export default function MesFavoris() {
  const [likedAnnonce, setLikedAnnonce] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("likedAnnonce");
    if (storedFavorites) {
      setLikedAnnonce(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFromFavorites = (annonce) => {
    const updatedFavorites = likedAnnonce.filter(
      (fav) => fav._id !== annonce._id
    );
    setLikedAnnonce(updatedFavorites);
    localStorage.setItem("likedAnnonce", JSON.stringify(updatedFavorites));
  };

  if (!likedAnnonce || likedAnnonce.length === 0) {
    return <p>Aucun favori trouvé</p>;
  }

  return (
    <div className={styles.annonceContainer}>
      {likedAnnonce.map((annonce) => (
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
              onClick={() => removeFromFavorites(annonce)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
