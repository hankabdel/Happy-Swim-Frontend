import styles from "../styles/MesReservation.module.css"; // Importe les styles CSS spécifiques à ce composant
import React, { useEffect, useState } from "react"; // Importe React et les hooks useEffect et useState
import { useSelector } from "react-redux"; // Importe le hook useSelector de react-redux pour accéder au state Redux
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importe FontAwesomeIcon pour afficher les icônes
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Importe l'icône de la corbeille de FontAwesome

// Définit le composant fonctionnel MesReservations
export default function MesReservations() {
  const [reservations, setReservations] = useState([]); // Initialise l'état pour stocker les réservations
  const [loading, setLoading] = useState(false); // Initialise un état pour gérer le chargement des données
  const user = useSelector((state) => state.user.value); // Récupère les informations de l'utilisateur depuis le state Redux

  // Utilise useEffect pour effectuer une action après le rendu du composant
  useEffect(() => {
    // Vérifie si l'utilisateur est authentifié
    if (user.token) {
      setLoading(true); // Active le chargement

      // Fait une requête GET pour récupérer les réservations de l'utilisateur
      fetch("http://localhost:3000/reservations/addReservation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(reservations),
      })
        .then((response) => {
          if (!response.ok) {
            // Si la réponse n'est pas "OK", on retourne une erreur
            throw new Error(
              `Erreur lors de la réservation: ${response.statusText}`
            );
          }
          return response.json(); // Analyser la réponse JSON si tout va bien
        })
        .then((data) => {
          console.log("Réservation réussie:", data);
        })
        .catch((error) => {
          console.error("Erreur lors de la réservation:", error.message);
        });
    }
  }, [user.token]); // Déclenche useEffect lorsque le token de l'utilisateur change

  const handleRemoveMesAnnonce = (reservationId) => {
    // Envoi d'une requête DELETE à l'API pour supprimer la réservation avec l'ID donné
    fetch(`http://localhost:3000/reservations/${reservationId}`, {
      method: "DELETE", // Spécifie la méthode HTTP DELETE pour supprimer la réservation
      headers: {
        "Content-Type": "application/json", // Indique que le contenu de la requête est en JSON
        Authorization: `Bearer ${user.token}`, // Ajoute le token d'authentification dans les headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression"); // Lance une erreur si la réponse n'est pas valide
        }
        return response.json(); // Convertit la réponse en JSON
      })
      .then((data) => {
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
      .catch((error) => {
        console.error("Erreur lors de la suppression:", error); // Affiche une erreur en cas de problème lors de la requête
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

      {/* Si les données sont en cours de chargement, affiche un message */}
      {loading ? (
        <p>Chargement des réservations...</p>
      ) : (
        <div className={styles.container}>
          {reservations.length > 0 ? ( // Si des réservations existent
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
                        aria-label="Supprimer la réservation"
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
      )}
    </div>
  );
}
