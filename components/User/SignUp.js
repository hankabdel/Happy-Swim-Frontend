import styles from "/styles/SignUp.module.css"; // Importe les styles CSS spécifiques à ce composant
import { useState, useEffect } from "react"; // Importe les hooks useState et useEffect de React
import { useRouter } from "next/router"; // Importe le hook useRouter de Next.js pour la navigation
import Modal from "react-modal"; // Importe la bibliothèque react-modal pour les modales
import { login } from "../../reducers/user"; // Importe l'action login depuis le reducer user
import { useDispatch, useSelector } from "react-redux"; // Importe les hooks useDispatch et useSelector de react-redux
import { backendURL } from "../../public/URLs";

export default function SignUp() {
  const dispatch = useDispatch(); // Initialise useDispatch pour envoyer des actions Redux
  const user = useSelector((state) => state.user.value); // Récupère la valeur de l'utilisateur depuis le state Redux

  // Déclare et initialise les états locaux avec useState
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture de la modal
  const [prenomUp, setPrenomUp] = useState(""); // État pour stocker le prénom de l'utilisateur
  const [nomUp, setNomUp] = useState(""); // État pour stocker le nom de l'utilisateur
  const [passwordUp, setPasswordUp] = useState(""); // État pour stocker le mot de passe de l'utilisateur
  const [emailUp, setEmailUp] = useState(""); // État pour stocker l'email de l'utilisateur
  const [error, setError] = useState(""); // État pour stocker les messages d'erreur
  const [loading, setLoading] = useState(false); // État pour afficher le loader pendant l'inscription

  const router = useRouter(); // Initialise useRouter pour la navigation

  // Redirection si l'utilisateur est déjà connecté (token présent)
  useEffect(() => {
    if (user.token) {
      router.push("/"); // Redirige vers la page d'accueil
    }
  }, [user.token, router]);

  useEffect(() => {
    Modal.setAppElement("#__next"); // Définit l'élément principal de l'application pour react-modal après le premier rendu
  }, []);

  // Expression régulière pour valider les adresses email
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Fonction pour gérer l'inscription de l'utilisateur
  const handleRegister = () => {
    setLoading(true); // Active le loader pendant la requête
    setError(""); // Réinitialise les erreurs avant la nouvelle tentative

    // Vérifie si l'email est valide
    if (!EMAIL_REGEX.test(emailUp)) {
      setError("Veuillez entrer une adresse e-mail valide."); // Affiche un message d'erreur si l'email est invalide
      setLoading(false); // Désactive le loader
      return;
    }
    // Vérifie si le mot de passe est valide
    if (
      !String(passwordUp)
        .toLowerCase()
        .match(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    ) {
      setError(
        "Le mot de passe doit contenir au moins un numéro et un caractère spécial"
      );
      setLoading(false); // Désactive le loader
      return;
    }

    // Envoie une requête POST à l'API pour créer un nouvel utilisateur
    fetch(
      // `${backendURL}/users/signup`,
      "http://localhost:3000/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: prenomUp,
          nom: nomUp,
          email: emailUp,
          password: passwordUp,
        }),
      }
    )
      .then((response) => response.json()) // Convertit la réponse en JSON
      .then((data) => {
        setLoading(false); // Désactive le loader après la réponse
        if (data.result) {
          dispatch(
            login({
              nom: nomUp,
              prenom: prenomUp,
              email: emailUp,
              token: data.user.token,
            })
          ); // Envoie l'action login avec les informations de l'utilisateur et le token
          setPrenomUp(""); // Réinitialise le prénom
          setNomUp(""); // Réinitialise le nom
          setPasswordUp(""); // Réinitialise le mot de passe
          setEmailUp(""); // Réinitialise l'email
          setError(""); // Réinitialise les erreurs
          setIsOpen(false); // Fermer la modal après l'inscription réussie
          router.push("/"); // Redirige vers la page d'accueil
        } else {
          setError(
            data.message || "Une erreur s'est produite. Veuillez réessayer."
          ); // Affiche un message d'erreur si l'inscription échoue
        }
      })
      .catch((error) => {
        setLoading(false); // Désactive le loader en cas d'erreur
        setError("Une erreur s'est produite. Veuillez réessayer."); // Affiche un message d'erreur en cas d'échec de la requête
      });
  };

  // Styles personnalisés pour la modal
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)", // Couleur de fond semi-transparente
    },
    content: {
      width: "450px",
      height: "520px",
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
      <button className={styles.buttonUp} onClick={() => setIsOpen(true)}>
        s'inscrire
      </button>

      <Modal
        isOpen={isOpen} // État de la modal (ouverte ou fermée)
        onRequestClose={() => setIsOpen(false)} // Fonction pour fermer la modal
        style={customStyles} // Applique les styles personnalisés
      >
        <div className={styles.container}>
          <div className={styles.logoContainer}></div>
          <h1 className={styles.h1}>Créez un compte</h1>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Prénom"
              className={styles.in}
              onChange={(e) => setPrenomUp(e.target.value)} // Met à jour l'état prenomUp
              value={prenomUp} // Valeur actuelle de prenomUp
            />
            <input
              type="text"
              placeholder="Nom"
              className={styles.in}
              onChange={(e) => setNomUp(e.target.value)} // Met à jour l'état nomUp
              value={nomUp} // Valeur actuelle de nomUp
            />
            <input
              type="email"
              placeholder="Email"
              className={styles.in}
              onChange={(e) => setEmailUp(e.target.value)} // Met à jour l'état emailUp
              value={emailUp} // Valeur actuelle de emailUp
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.in}
              onChange={(e) => setPasswordUp(e.target.value)} // Met à jour l'état passwordUp
              value={passwordUp} // Valeur actuelle de passwordUp
            />
          </div>
        </div>

        <div className={styles.buttonUp3}>
          {/* Bouton pour soumettre le formulaire d'inscription */}
          <button
            className={styles.buttonUp2}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </div>

        {/* Affiche un message d'erreur */}
        {error && <p className={styles.error}>{error}</p>}
      </Modal>
    </div>
  );
}
