import styles from "../styles/Recherche.module.css"; // Importation des styles CSS spécifiques au composant
import { useState } from "react"; // Importation du hook useState de React pour la gestion de l'état
import { useDispatch, useSelector } from "react-redux"; // Importation des hooks Redux pour accéder à l'état global et dispatcher des actions
import { addMesRecherche } from "../reducers/mesRecherche"; // Importation de l'action Redux pour ajouter les résultats de recherche

// Déclaration du composant fonctionnel Search
export default function Search() {
  // État local pour stocker la ville de recherche et les messages d'erreur
  const [ville, setVille] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch(); // Hook pour dispatcher des actions Redux
  const search = useSelector((state) => state.mesRecherche.value); // Accès aux résultats de recherche depuis le store Redux

  // Fonction pour gérer la recherche des annonces en fonction de la ville
  const handleSearch = () => {
    // Vérifie si le champ ville est vide ou contient uniquement des espaces
    if (!ville.trim()) {
      setErrorMessage("Aucune annonce n'est disponible dans cette ville.");
      return;
    }

    // Requête HTTP pour rechercher les annonces par ville
    fetch(`http://localhost:3000/annonces/search?ville=${ville}`)
      .then((response) => {
        // Vérifie si la réponse du serveur n'est pas OK (code 200-299)
        if (!response.ok) {
          throw new Error("Aucune annonce n'est disponible dans cette ville.");
        }
        return response.json(); // Convertit la réponse en JSON
      })
      .then((data) => {
        // console.log("Données reçues------>", data);
        // Vérifie si la réponse contient une erreur
        if (data.error) {
          setErrorMessage(data.error); // Met à jour le message d'erreur
        } else {
          dispatch(addMesRecherche(data)); // Dispatch l'action Redux pour ajouter les résultats de recherche
          setErrorMessage(""); // Réinitialise le message d'erreur
        }
      })
      // Gère les erreurs de la requête fetch
      .catch((error) => {
        setErrorMessage(error.message); // Met à jour le message d'erreur
      });
  };

  // Rendu du composant
  return (
    <div className={styles.main}>
      <div className={styles.inputRecherche}>
        <input
          type="text"
          placeholder="Entrez le nom de la ville"
          className={styles.in}
          onChange={(e) => setVille(e.target.value)} // Met à jour l'état local de la ville lors de la saisie de l'utilisateur
          value={ville} // Valeur actuelle du champ de saisie ville
        />
        <button className={styles.button} onClick={handleSearch}>
          Rechercher
        </button>
        {/* Affiche le message d'erreur s'il existe */}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
      <div className={styles.container}>
        {search.length > 0 ? ( // Vérifie s'il y a des résultats de recherche
          // Parcourt les résultats de recherche et affiche chaque annonce
          search.map((cherche, i) => (
            <div className={styles.annonceContainer} key={i}>
              <div className={styles.card}>
                <img
                  className={styles.imageFond}
                  src="image/image37.png"
                  alt="image"
                />
                <div className={styles.info}>
                  <h2>{cherche.titre}</h2>
                  <p>Ville: {cherche.ville}</p>
                  <p>Prix: {cherche.prix}€</p>
                </div>
              </div>
              <div className={styles.cardScroll}></div>
            </div>
          ))
        ) : (
          <div className={styles.p}>
            <p>Aucune recherche trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
