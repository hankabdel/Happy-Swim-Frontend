import styles from "../styles/MesReservation.module.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
                    <p>Ville: {reservation.ville}</p>
                    <p>Heure Debut: {reservation.heureDebut}</p>
                    <p>Heure Fin: {reservation.heureFin}</p>
                    <p>Personne: {reservation.personne}</p>
                    <p>Date: {formatDate(reservation.date)}</p>
                    <p>Prix: {reservation.prix}</p>
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
