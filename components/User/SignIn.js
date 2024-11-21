import styles from "/styles/SignIn.module.css"; // Importe les styles CSS spécifiques à ce composant
import React, { useState, useEffect } from "react"; // Importe React et les hooks nécessaires
import { useRouter } from "next/router"; // Importe le hook useRouter de Next.js pour la navigation
import Modal from "react-modal"; // Importe la bibliothèque react-modal pour les modales
import { login } from "../../reducers/user"; // Importe l'action login depuis le reducer user
import { useDispatch, useSelector } from "react-redux"; // Importe les hooks useDispatch et useSelector de react-redux
import { backendURL } from "../../public/URLs";

export default function SignIn() {
  const dispatch = useDispatch(); // Initialise useDispatch pour envoyer des actions Redux
  const user = useSelector((state) => state.user.value); // Récupère la valeur de l'utilisateur depuis le state Redux

  // Déclare et initialise les états locaux avec useState
  const [isOpenIn, setIsOpenIn] = useState(false); // État pour gérer l'ouverture de la modal
  const [emailIn, setEmailIn] = useState(""); // État pour stocker l'email de l'utilisateur
  const [passwordIn, setPasswordIn] = useState(""); // État pour stocker le mot de passe de l'utilisateur
  const [error, setError] = useState(null); // État pour gérer les messages d'erreur
  const [loading, setLoading] = useState(false); // État pour gérer l'affichage d'un loader pendant la connexion

  const router = useRouter(); // Initialise useRouter pour la navigation

  // Redirection si l'utilisateur est déjà connecté (token présent)
  useEffect(() => {
    if (user.token) {
      router.push("/"); // Redirige vers la page d'accueil
    }
  }, [user.token, router]);

  // Fonction pour gérer la connexion de l'utilisateur
  const handleConnection = () => {
    setLoading(true); // Active le loader pendant la connexion
    setError(null); // Réinitialise les erreurs avant la nouvelle tentative de connexion

    // signin
    fetch(
      // `${backendURL}/users/signin`,
      "http://localhost:3000/users/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailIn, password: passwordIn }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              email: data.email,
              token: data.token,
              nom: data.nom,
              prenom: data.prenom,
            })
          );
        } else {
          console.error("Erreur de connexion:", data.error);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
      });
  };

  // Styles personnalisés pour la modal
  const customStylesIn = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)", // Couleur de fond semi-transparente
    },
    content: {
      width: "450px",
      height: "470px",
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)", // Centrage de la modal
      backgroundColor: " #06579D", // Couleur de fond de la modal
    },
  };

  return (
    <div>
      {/* Bouton pour ouvrir la modal */}
      <button className={styles.buttonIn} onClick={() => setIsOpenIn(true)}>
        se connecter
      </button>

      <Modal
        isOpen={isOpenIn} // État de la modal (ouverte ou fermée)
        onRequestClose={() => setIsOpenIn(false)} // Fonction pour fermer la modal
        style={customStylesIn} // Applique les styles personnalisés
      >
        <div className={styles.container}>
          <h1 className={styles.h1}>Connectez-vous</h1>
          <div className={styles.inputIn}>
            <input
              type="email"
              placeholder="E-mail"
              className={styles.inIn}
              onChange={(e) => setEmailIn(e.target.value)} // Met à jour l'état emailIn
              value={emailIn} // Valeur actuelle de emailIn
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.inIn}
              onChange={(e) => setPasswordIn(e.target.value)} // Met à jour l'état passwordIn
              value={passwordIn} // Valeur actuelle de passwordIn
            />
          </div>

          <div className={styles.buttonIn3}>
            {/* Bouton pour soumettre le formulaire de connexion */}
            <button
              className={styles.buttonIn2}
              onClick={handleConnection}
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </div>

          {/* Affiche un message d'erreur s'il y en a un */}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </Modal>
    </div>
  );
}
