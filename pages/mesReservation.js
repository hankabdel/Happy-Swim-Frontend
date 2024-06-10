import styles from "../styles/MesReservation.module.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function MesReservations() {
  const [reservations, setReservations] = useState([]);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user.token) {
      fetch("http://localhost:3000/reservations/", {
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
            setReservations(data.data);
          } else {
            console.error("Erreur de récupération des données:", data.error);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error);
        });
    }
  }, [user.token]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // const handleRemoveMesAnnonce = () => {
  //   fetch(`http://localhost:3000/reservation/delete`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log("------>sup", data);
  //       if (data.result) {
  //         // console.log("true", data);
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
      <h1 className={styles.h1}>Mes Reservation</h1>
      <div className={styles.container}>
        {reservations.length > 0 ? (
          reservations.map((reservation, i) => (
            <div className={styles.annonceContainer} key={i}>
              <div className={styles.card}>
                <img
                  className={styles.imageFond}
                  src="image/image37.png"
                  alt="image"
                />
                <div className={styles.info}>
                  <div className={styles.infoText}>
                    <h2>{reservation.titre}</h2>
                    <div className={styles.heureDf}>
                      <p>Ville: {reservation.ville}</p>
                      <p>Date: {formatDate(reservation.date)}</p>
                    </div>
                    <div className={styles.heureDf}>
                      <p>Heure Debut: {reservation.heureDebut}</p>
                      <p>Heure Fin: {reservation.heureFin}</p>
                    </div>
                    <div className={styles.heureDf}>
                      <p>Personne: {reservation.personne}</p>
                      <p>Prix: {reservation.prix}</p>
                    </div>
                  </div>
                  <div className={styles.IconPl}>
                    <FontAwesomeIcon
                      className={styles.icon1}
                      icon={faTrash}
                      onClick={() => handleRemoveMesAnnonce(reservation._id)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.cardScroll}></div>
            </div>
          ))
        ) : (
          <div className={styles.p}>
            <p>Aucun reservation trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
