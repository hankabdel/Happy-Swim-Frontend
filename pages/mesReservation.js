import styles from "../styles/MesReservation.module.css"; // Importe les styles CSS spécifiques à ce composant
import React, { useEffect, useState } from "react"; // Importe React et les hooks useEffect et useState
import { useSelector } from "react-redux"; // Importe le hook useSelector de react-redux pour accéder au state Redux
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importe FontAwesomeIcon pour afficher les icônes
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Importe l'icône de la corbeille de FontAwesome

// Définit le composant fonctionnel MesReservations
export default function MesReservations() {
  const [reservations, setReservations] = useState([]); // Initialise l'état pour stocker les réservations
  const user = useSelector((state) => state.user.value); // Récupère les informations de l'utilisateur depuis le state Redux
  // const backendURL = process.env.REACT_APP_BACKEND_URL;

  // Utilise useEffect pour effectuer une action après le rendu du composant
  useEffect(() => {
    // Vérifie si l'utilisateur est authentifié
    if (user.token) {
      // Fait une requête GET pour récupérer les réservations de l'utilisateur
      fetch("http://localhost:3000/reservations/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Ajoute le token d'authentification dans les headers
        },
      })
        .then((response) => {
          // Vérifie si la réponse est valide
          if (!response) {
            throw new Error("Erreur");
          }
          return response.json(); // Convertit la réponse en JSON
        })
        .then((data) => {
          // Vérifie si la requête a réussi
          if (data.result) {
            setReservations(data.data); // Met à jour l'état avec les données des réservations
          } else {
            console.error("Erreur de récupération des données:", data.error); // Affiche une erreur si la requête a échoué
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error); // Affiche une erreur en cas de problème lors de la requête
        });
    }
  }, [user.token]); // Déclenche useEffect lorsque le token de l'utilisateur change

  const handleRemoveMesAnnonce = (reservationId) => {
    // Envoi d'une requête DELETE à l'API pour supprimer la réservation avec l'ID donné
    fetch(
      `http://localhost:3000/reservations/${reservationId}`,
      // `${backendURL}/annonces/${reservationId}`
      {
        method: "DELETE", // Spécifie la méthode HTTP DELETE pour supprimer la réservation
        headers: {
          "Content-Type": "application/json", // Indique que le contenu de la requête est en JSON
          Authorization: `Bearer ${user.token}`, // Ajoute le token d'authentification dans les headers
        },
      }
    )
      // Traite la réponse de la requête
      .then((response) => {
        // Vérifie si la réponse est valide (status HTTP 200-299)
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression"); // Lance une erreur si la réponse n'est pas valide
        }
        return response.json(); // Convertit la réponse en JSON
      })
      // Traite les données JSON de la réponse
      .then((data) => {
        // Vérifie si la suppression a été réussie
        if (data.result) {
          // Met à jour l'état local des réservations en filtrant la réservation supprimée
          setReservations((prevReservations) =>
            prevReservations.filter(
              (reservation) => reservation._id !== reservationId // Filtre la réservation supprimée par son ID
            )
          );
        } else {
          console.error("Erreur de suppression:", data.error);
        }
      })
      // Capture et affiche les erreurs en cas de problème lors de la requête
      .catch((error) => {
        console.error("Erreur lors de la suppression:", error);
      });
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" }; // Options de formatage pour la date
    return new Date(dateString).toLocaleDateString("fr-FR", options); // Convertit la date en chaîne de caractères formatée
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Mes Reservation</h1>
      <div className={styles.container}>
        {reservations.length > 0 ? ( // Si des réservations existent
          // Map sur les réservations pour afficher chaque réservation
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
                      onClick={() => handleRemoveMesAnnonce(reservation._id)} // Fonction pour supprimer la réservation
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
