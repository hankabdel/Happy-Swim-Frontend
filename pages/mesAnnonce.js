import styles from "../styles/MesAnnonce.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeAnnonce } from "../reducers/annonce";

export default function MesAnnonce() {
  const [mesAnnonce, setMesAnnonce] = useState([]);
  const user = useSelector((state) => state.user.value);
  const annonceReducer = useSelector((state) => state.annonce.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token) {
      fetch("http://localhost:3000/annonces/mesAnnonces", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          if (!response) {
            console.log("hello", response);
            throw new Error("Erreur");
          }
          return response.json();
        })
        .then((data) => {
          if (data.result) {
            setMesAnnonce(data.data);
          } else {
            console.error("Erreur de récupération des données:", data.error);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error);
        });
    }
  }, [user.token]);

  // const handleRemoveMesAnnonce = (annonceId) => {
  //   fetch(`http://localhost:3000/annonces/delete`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("------>sup", data);
  //       if (data.result) {
  //         console.log("true", data);
  //         dispatch(removeAnnonce({ _id: data.annonceId }));
  //         console.log(annonceReducer.length);
  //         setMesAnnonce((prevData) =>
  //           prevData.filter((annonce) => annonce._id !== data.annonceId)
  //         );
  //       }
  //     });
  //   console.log(annonceReducer);
  // };

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Mes Annonces</h1>
      <div className={styles.container}>
        {mesAnnonce.length > 0 ? (
          mesAnnonce.map((e, i) => (
            <div className={styles.annonceContainer} key={i}>
              <div className={styles.card}>
                <img
                  className={styles.imageFond}
                  src="image/image37.png"
                  alt="image"
                />
                <div className={styles.info}>
                  <div className={styles.infoText}>
                    <h2>{e.titre}</h2>
                    <p>Ville: {e.ville}</p>
                    <p>Personne: {e.personne}</p>
                    <p>Prix: {e.prix}</p>
                  </div>
                  {/* <div className={styles.IconPl}>
                    <FontAwesomeIcon
                      className={styles.icon1}
                      icon={faTrash}
                      onClick={() => handleRemoveMesAnnonce(e._id)}
                    />
                  </div> */}
                </div>
              </div>
              <div className={styles.cardScroll}></div>
            </div>
          ))
        ) : (
          <div className={styles.p}>
            <p>Aucune annonce trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
