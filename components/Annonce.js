import styles from "../styles/Annonce.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMesFavoris, removeMesFavoris } from "../reducers/mesFavoris";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Annonce() {
  const [annonceData, setAnnonceData] = useState([]);
  const dispatch = useDispatch();
  const favoris = useSelector((state) => state.mesFavoris.value);

  useEffect(() => {
    fetch("http://localhost:3000/annonces/recover", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("----->data", data);
        setAnnonceData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleToggleFavori = (annonce) => {
    const isFavori = favoris.some((e) => e._id === annonce._id);
    if (!isFavori) {
      dispatch(addMesFavoris({ ...annonce }));
      console.log("Add favoris");
    } else {
      dispatch(removeMesFavoris({ id: annonce._id, ...annonce })); //  ...annonce il vas vérifier dans toutes les annonces qui port un ID
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.annonceContainer}>
          {annonceData.map((annonce, i) => {
            const isFavori = favoris.some((e) => e._id === annonce._id);
            let iconStyle = isFavori ? { color: "red" } : { color: "white" };

            return (
              <div className={styles.card} key={i}>
                <img
                  className={styles.imageFond}
                  src="image/image37.png"
                  alt="image"
                />
                <div className={styles.info}>
                  <h2>{annonce.titre}</h2>
                  <p>Adresse: {annonce.adresse}</p>
                  <p>Prix: {annonce.prix}</p>
                  <div className={styles.heart}>
                    <FontAwesomeIcon
                      className={styles.heartIcon}
                      style={iconStyle}
                      onClick={() => handleToggleFavori(annonce)}
                      icon={faHeart}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className={styles.cardScroll}></div>
        </div>
      </div>
    </div>
  );
}
