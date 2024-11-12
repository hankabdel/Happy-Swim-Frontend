import React, { useState, useEffect } from "react";
import AnnonceCard from "../components/AnnonceCard";
import { backendURL } from "../public/URLs";

const AnnoncesPage = () => {
  const [favoris, setFavoris] = useState([]);
  const [user, setUser] = useState(null); // Initialisé à null
  const [isClient, setIsClient] = useState(false); // Vérifie si le composant est monté côté client

  // Vérifie si le composant est monté côté client et récupère le token
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setUser({ token });
      }
    }
  }, []);

  const handleToggleFavori = (annonce) => {
    const isFavori = favoris.some((e) => e._id === annonce._id);
    if (!isFavori) {
      setFavoris([...favoris, annonce]);
    } else {
      setFavoris(favoris.filter((e) => e._id !== annonce._id));
    }
  };

  const handleRegisterReservation = async (reservationData) => {
    if (!user || !user.token) {
      console.error("Token manquant. Veuillez vous connecter.");
      return;
    }
    try {
      const response = await fetch(`${backendURL}/reservations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();
      if (!data.result) {
        console.error("Erreur de réservation :", data.error);
      } else {
        console.log("Réservation réussie :", data);
      }
    } catch (error) {
      console.error("Erreur réseau ou autre :", error);
    }
  };

  if (!isClient) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <AnnonceCard
        favoris={favoris}
        user={user || { token: null }}
        onToggleFavori={handleToggleFavori}
        onRegisterReservation={handleRegisterReservation}
      />
    </div>
  );
};

export default AnnoncesPage;
