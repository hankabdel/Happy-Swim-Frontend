import styles from "../styles/Recherche.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMesRecherche, resetMesRecherche } from "../reducers/mesRecherche";

export default function Search() {
  const [ville, setVille] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const search = useSelector((state) => state.mesRecherche.value);

  const handleSearch = async () => {
    // Vérification si la ville est vide
    if (!ville.trim()) {
      setErrorMessage("");
      dispatch(resetMesRecherche());
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/annonces/searchAnnonces?ville=${ville}`
      );

      if (!response.ok) {
        throw new Error("Aucune annonce n'est disponible dans cette ville.");
      }

      const data = await response.json();

      // Validation de la réponse
      if (data.error) {
        setErrorMessage(data.error);
      } else if (Array.isArray(data.data)) {
        // Vérification que data.data est un tableau
        dispatch(addMesRecherche(data.data)); // Ajout des résultats de recherche dans Redux
        setErrorMessage("");
      } else {
        setErrorMessage("Les données renvoyées ne sont pas valides.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.inputRecherche}>
        <input
          type="text"
          placeholder="Entrez le nom de la ville"
          className={styles.in}
          onChange={(e) => {
            const inputValue = e.target.value.trim();
            setVille(inputValue); // Met à jour la ville avec la valeur entrée

            // Si la barre de recherche est vide, on réinitialise les résultats de la recherche
            if (!inputValue) {
              dispatch(resetMesRecherche());
              setErrorMessage(""); // Réinitialise le message d'erreur
            }
          }}
          value={ville}
        />
        <button className={styles.button} onClick={handleSearch}>
          Rechercher
        </button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
      <div className={styles.container}>
        {search.length > 0 ? (
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
