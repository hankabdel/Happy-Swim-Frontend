import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react"; // Importation de React et des hooks useEffect et useState
import AnnonceCard from "../components/AnnonceCard";
import MesFavoris from "./mesFavoris";
import { useSelector } from "react-redux"; // Importation des hooks Redux

export default function Home() {
  const [likedAnnonce, setLikedAnnonce] = useState([]);
  const [annonceData, setAnnonceData] = useState([]); // Liste des annonces récupérées
  const user = useSelector((state) => state.user.value); // Récupère le user depuis Redux

  // Fonction pour récupérer les annonces depuis le backend
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await fetch("http://localhost:3000/annonces", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des annonces");
        }
        const data = await response.json();
        setAnnonceData(data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces :", error);
      }
    };
    fetchAnnonces();
  }, [user]);

  // Ajouter une annonce aux favoris
  const addToFavorites = (annonce) => {
    if (!likedAnnonce.some((fav) => fav._id === annonce._id)) {
      setLikedAnnonce((prev) => [...prev, annonce]);
    }
  };

  // Retirer une annonce des favoris
  const removeFromFavorites = (annonce) => {
    setLikedAnnonce((prev) => prev.filter((fav) => fav._id !== annonce._id));
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            className={styles.imageFond}
            src="https://res.cloudinary.com/dnr5cehaa/image/upload/v1729874685/image37_xi5sfs.png"
            alt="image"
          />
        </div>
        <div className={styles.annonce}>
          <div className={styles.logo}>
            <img className={styles.logoh} src="/logoh.png" alt="logo" />
          </div>
          <div className={styles.h1H2}>
            <h1 className={styles.h1}>Le bonheur est partagé</h1>
            <h2 className={styles.h2}>
              Vous avez la possibilité de louer une piscine privée partout en
              France
            </h2>
          </div>
          <div className={styles.imgDsn}>
            <img
              className={styles.imageDsn}
              src="https://res.cloudinary.com/dnr5cehaa/image/upload/v1729874724/image22_elokz1.jpg"
              alt="logo"
            />
          </div>
        </div>
        <div className={styles.imageAnime}>
          <p className={styles.textHappy}>
            Happy swim, Deux façons de rendre les gens heureux!
          </p>
        </div>
      </div>
      {/* //AnnonceCard */}
      <div className={styles.containerAnnonce}>
        <AnnonceCard
          annonces={annonceData} // Transmet les annonces
          likedAnnonce={likedAnnonce} // Transmet la liste des favoris
          addToFavorites={addToFavorites} // Transmet la fonction d'ajout
          removeFromFavorites={removeFromFavorites} // Transmet la fonction de retrait
        />
        {/* mesFavoris */}
        <MesFavoris
          annonces={likedAnnonce} // Transmet uniquement les favoris
          removeFromFavorites={removeFromFavorites} // Transmet la fonction de retrait
        />
      </div>
    </div>
  );
}
