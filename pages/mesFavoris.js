import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/MesFavoris.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addMesFavoris, removeMesFavoris } from "../reducers/mesFavoris";

const MesFavoris = () => {
  const dispatch = useDispatch();
  const favoris = useSelector((state) => state.mesFavoris.value); // Accès aux favoris via Redux

  // Fonction pour gérer les favoris
  const handleToggleFavori = (heart) => {
    const isFavori = favoris.some((e) => e._id === heart._id);
    if (!isFavori) {
      dispatch(addMesFavoris(heart)); // Ajoute aux favoris
    } else {
      dispatch(removeMesFavoris(heart)); // Retire des favoris
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Mes Favoris</h1>
      <div className={styles.container}>
        {favoris.length > 0 ? (
          favoris.map((heart, i) => {
            const isFavori = favoris.some((e) => e._id === heart._id);
            let iconStyle = isFavori ? { color: "red" } : { color: "white" };

            return (
              <div className={styles.annonceContainer} key={i}>
                <div className={styles.card}>
                  <img
                    className={styles.imageFond}
                    src="https://res.cloudinary.com/dnr5cehaa/image/upload/v1729874685/image37_xi5sfs.png"
                    alt="image"
                  />
                  <div className={styles.info}>
                    <h2>{heart.titre}</h2>
                    <p>Ville: {heart.ville}</p>
                    <p>Prix: {heart.prix}€</p>
                  </div>
                  <div className={styles.heartIcon}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={iconStyle}
                      onClick={() => handleToggleFavori(heart)} // Gestion des favoris via Redux
                    />
                  </div>
                </div>
              </div>
            );
          })
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
