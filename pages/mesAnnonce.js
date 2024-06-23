import styles from "../styles/MesAnnonce.module.css"; // Importe les styles CSS spécifiques à ce composant
import React, { useEffect, useState } from "react"; // Importe React et les hooks useEffect et useState
import { useSelector, useDispatch } from "react-redux"; // Importe les hooks useSelector et useDispatch de react-redux
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importe FontAwesomeIcon pour utiliser des icônes
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Importe l'icône faTrash de FontAwesome
import { removeAnnonce } from "../reducers/annonce"; // Importe l'action removeAnnonce depuis le reducer annonce

// Définit et exporte le composant fonctionnel MesAnnonce
export default function MesAnnonce() {
  const [mesAnnonce, setMesAnnonce] = useState([]); // Déclare et initialise l'état pour stocker les annonces
  const user = useSelector((state) => state.user.value); // Récupère la valeur de l'utilisateur depuis le state Redux
  const annonceReducer = useSelector((state) => state.annonce.value); // Récupère la valeur des annonces depuis le state Redux
  const dispatch = useDispatch(); // Initialise useDispatch pour envoyer des actions Redux

  // Utilise useEffect pour effectuer des effets de bord
  useEffect(() => {
    // Si l'utilisateur est connecté (token présent)
    if (user.token) {
      fetch("http://localhost:3000/annonces/mesAnnonces", {
        method: "GET", // Méthode HTTP GET
        headers: {
          "Content-Type": "application/json", // En-tête pour indiquer le type de contenu
          Authorization: `Bearer ${user.token}`, // En-tête d'autorisation avec le token de l'utilisateur
        },
      })
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
  const handleRemoveMesAnnonce = (annonceId) => {
    fetch(`http://localhost:3000/annonces/delete`, {
      method: "DELETE", // Méthode HTTP DELETE
      headers: {
        "Content-Type": "application/json", // En-tête pour indiquer le type de contenu
        Authorization: `Bearer ${user.token}`, // En-tête d'autorisation avec le token de l'utilisateur
      },
    })
      .then((response) => response.json()) // Convertit la réponse en JSON
      .then((data) => {
        // Si la suppression est réussie
        if (data.result) {
          dispatch(removeAnnonce({ _id: data.annonceId })); // Envoie l'action removeAnnonce avec l'ID de l'annonce supprimée
          console.log(annonceReducer.length);
          setMesAnnonce((prevData) =>
            prevData.filter((annonce) => annonce._id !== data.annonceId)
          ); // Met à jour l'état mesAnnonce en filtrant l'annonce supprimée
        }
      });
    console.log(annonceReducer);
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>Mes Annonces</h1>
      <div className={styles.container}>
        {mesAnnonce.length > 0 ? ( // Si des annonces existent
          // Map sur mesAnnonce pour afficher chaque annonce
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
                  <div className={styles.IconPl}>
                    {/* Icône de suppression pour supprimer l'annonce */}
                    <FontAwesomeIcon
                      className={styles.icon1}
                      icon={faTrash}
                      onClick={() => handleRemoveMesAnnonce(e._id)}
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
