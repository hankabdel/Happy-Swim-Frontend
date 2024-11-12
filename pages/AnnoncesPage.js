import React, { useState, useEffect } from "react";
import AnnonceCard from "../components/AnnonceCard";
import { backendURL } from "../public/URLs";

const AnnoncesPage = () => {
  // État pour les favoris et l'utilisateur
  const [favoris, setFavoris] = useState([]);
  const [user, setUser] = useState(null); // Initialisé à null
  const [isClient, setIsClient] = useState(false); // Vérifie si on est côté client

  // Vérifie si le composant est monté côté client
  useEffect(() => {
    setIsClient(true); // Indique qu'on est maintenant côté client
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null; // Récupère le token côté client
    if (token) {
      setUser({ token });
    }
  }, []); // Exécuté une seule fois au montage

  // Fonction pour gérer l'ajout et la suppression des favoris
  const handleToggleFavori = (annonce) => {
    const isFavori = favoris.some((e) => e._id === annonce._id);

    if (!isFavori) {
      // Ajouter l'annonce aux favoris
      setFavoris([...favoris, annonce]);
    } else {
      // Supprimer l'annonce des favoris
      setFavoris(favoris.filter((e) => e._id !== annonce._id));
    }
  };

  // Fonction pour gérer l'enregistrement des réservations
  const handleRegisterReservation = async (reservationData) => {
    if (!user || !user.token) {
      console.error("Token manquant, veuillez vous connecter.");
      return;
    }

    try {
      const response = await fetch(`${backendURL}/reservations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Utilisation du token pour l'authentification
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();
      if (!data.result) {
        console.error("Erreur lors de la réservation:", data.error);
      } else {
        console.log("Réservation réussie:", data);
      }
    } catch (error) {
      console.error("Erreur réseau ou autre:", error);
    }
  };

  // Empêche le rendu côté serveur en attendant l'accès au client
  if (!isClient) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <AnnonceCard
        favoris={favoris}
        user={user || { token: null }} // Fournit un user par défaut si nécessaire
        onToggleFavori={handleToggleFavori}
        onRegisterReservation={handleRegisterReservation}
      />
    </div>
  );
};

export default AnnoncesPage;
