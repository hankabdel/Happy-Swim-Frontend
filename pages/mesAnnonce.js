import styles from "../styles/MesAnnonce.module.css"; // Importe les styles CSS spécifiques à ce composant
import React, { useEffect, useState } from "react"; // Importe React et les hooks useEffect et useState
import { useSelector, useDispatch } from "react-redux"; // Importe les hooks useSelector et useDispatch de react-redux
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importe FontAwesomeIcon pour utiliser des icônes
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Importe l'icône faTrash de FontAwesome
import { removeAnnonce } from "../reducers/annonce"; // Importe l'action removeAnnonce depuis le reducer annonce
import { backendURL } from "../public/URLs";

// Définit et exporte le composant fonctionnel MesAnnonce
export default function MesAnnonce() {
  const [mesAnnonce, setMesAnnonce] = useState([]); // Déclare et initialise l'état pour stocker les annonces
  const [annonceIdToRemove, setAnnonceIdToRemove] = useState(null); // Nouvel état pour l'ID de l'annonce à supprimer
  const user = useSelector((state) => state.user.value); // Récupère la valeur de l'utilisateur depuis le state Redux
  const annonceReducer = useSelector((state) => state.annonce.value); // Récupère la valeur des annonces depuis le state Redux
  const dispatch = useDispatch(); // Initialise useDispatch pour envoyer des actions Redux
  // Utilise useEffect pour effectuer des effets de bord
  useEffect(() => {
    // Si l'utilisateur est connecté (token présent)
    if (user.token) {
      fetch(
        `${backendURL}/annonces/mesAnnonces`,
        // "http://localhost:3000/annonces/mesAnnonces",
        {
          method: "GET", // Méthode HTTP GET
          headers: {
            "Content-Type": "application/json", // En-tête pour indiquer le type de contenu
            Authorization: `Bearer ${user.token}`, // En-tête d'autorisation avec le token de l'utilisateur
          },
        }
      )
        .then((response) => {
          // Vérifie si la réponse est invalide
          if (!response) {
            throw new Error("Erreur"); // Lève une erreur
          }
          return response.json(); // Convertit la réponse en JSON
        })
        .then((data) => {
          // Si la récupération des annonces est réussie
          if (data.result) {
            setMesAnnonce(data.data); // Met à jour l'état mesAnnonce avec les données récupérées
          } else {
            console.error("Erreur de récupération des données:", data.error); // Affiche une erreur si la récupération a échoué
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error); // Affiche une erreur en cas d'échec de la requête
        });
    }
  }, [user.token]); // Dépendance sur user.token pour exécuter l'effet lors de la connexion de l'utilisateur

  // Fonction pour gérer la suppression d'une annonce
  useEffect(() => {
    if (annonceIdToRemove) {
      fetch(
        `${backendURL}/annonces`,
        // `http://localhost:3000/annonces/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ annonceId: annonceIdToRemove }), // Envoie de l'ID de l'annonce à supprimer
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(removeAnnonce({ _id: annonceIdToRemove })); // Supprime l'annonce dans le store Redux
            setMesAnnonce((prevData) =>
              prevData.filter((annonce) => annonce._id !== annonceIdToRemove)
            ); // Met à jour l'état pour retirer l'annonce supprimée
            setAnnonceIdToRemove(null); // Réinitialise l'ID après suppression
          } else {
            console.error(
              "Erreur lors de la suppression de l'annonce:",
              data.error
            );
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'annonce:", error);
        });
    }
  }, [annonceIdToRemove, user.token, dispatch]);

  // Fonction appelée lors du clic sur l'icône pour déclencher la suppression
  const handleClickRemove = (annonceId) => {
    setAnnonceIdToRemove(annonceId); // Met à jour l'état pour déclencher la suppression via useEffect
  };

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
                  src="https://res.cloudinary.com/dnr5cehaa/image/upload/v1729874685/image37_xi5sfs.png"
                  alt="image"
                />
                <div className={styles.info}>
                  <div className={styles.infoText}>
                    <h2>{e.titre}</h2>
                    <p>Ville: {e.ville}</p>
                    <p>Personne: {e.personne}</p>
                    <p>Prix: {e.prix}</p>
                  </div>
                  <div className={styles.IconPl}>
                    <FontAwesomeIcon
                      className={styles.icon1}
                      icon={faTrash}
                      onClick={() => handleClickRemove(e._id)} // Déclenche la suppression lors du clic
                    />
                  </div>
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
