import React, { useState, useEffect } from "react";
import AnnonceCard from "../components/AnnonceCard";
import { backendURL } from "../public/URLs";

const AnnoncesPage = () => {
  const [favoris, setFavoris] = useState([]); // Gérer les favoris localement
  const [user, setUser] = useState(null); // Informations utilisateur
  const [annonceData, setAnnonceData] = useState([]); // Données des annonces

  // Charger les annonces au montage du composant
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await fetch(`${backendURL}/annonces`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des annonces");
        }
        const data = await response.json();
        setAnnonceData(data.data); // Stocker les annonces dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces :", error);
      }
    };
    fetchAnnonces();
  }, []);

  // Récupérer l'utilisateur (s'il est connecté) après le montage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  // Gestion des favoris
  const handleToggleFavori = (annonce) => {
    const isFavori = favoris.some((e) => e._id === annonce._id);

    if (!isFavori) {
      setFavoris([...favoris, annonce]); // Ajouter aux favoris
    } else {
      setFavoris(favoris.filter((e) => e._id !== annonce._id)); // Supprimer des favoris
    }
  };

  // Gestion de la réservation
  const handleRegisterReservation = (reservationData) => {
    if (!user || !user.token) {
      alert("Vous devez être connecté pour réserver une annonce !");
      return; // Arrêter si l'utilisateur n'est pas connecté
    }

    const registerReservation = async () => {
      try {
        // Ajout de userId aux données de réservation
        const reservationPayload = {
          ...reservationData,
          userId: user._id, // Ajouter l'ID utilisateur
        };

        const response = await fetch(`${backendURL}/reservations/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(reservationPayload),
        });

        const data = await response.json();
        if (!data.result) {
          console.error("Erreur de réservation :", data.error);
        } else {
          alert("Réservation réussie !");
        }
      } catch (error) {
        console.error("Erreur lors de la réservation :", error);
      }
    };

    registerReservation();
  };

  return (
    <div>
      <AnnonceCard
        annonces={annonceData} // Passer les annonces récupérées
        favoris={favoris}
        user={user}
        onToggleFavori={handleToggleFavori}
        onRegisterReservation={handleRegisterReservation}
      />
    </div>
  );
};

export default AnnoncesPage;
