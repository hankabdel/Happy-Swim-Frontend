import styles from "../styles/SignUp.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { login } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

export default function SignUp() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isOpen, setIsOpen] = useState(false);
  const [prenomUp, setPrenomUp] = useState("");
  const [nomUp, setNomUp] = useState("");
  const [passwordUp, setPasswordUp] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  if (user.token) {
    router.push("/");
  }

  useEffect(() => {
    Modal.setAppElement("#__next"); // Définit l'élément d'application pour react-modal
  }, []);

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleRegister = () => {
    if (!EMAIL_REGEX.test(emailUp)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    // fetch("http://localhost:3000/users/signup"
    fetch("https://happy-swim-backend.vercel.app/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prenom: prenomUp,
        nom: nomUp,
        email: emailUp,
        password: passwordUp,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            login({
              nom: nomUp,
              prenom: prenomUp,
              email: emailUp,
              token: data.token,
            })
          );
          setPrenomUp("");
          setNomUp("");
          setPasswordUp("");
          setEmailUp("");
          setError("");
          setIsOpen(false); // Fermer la modal après l'inscription réussie
        } else {
          setError(
            data.message || "Une erreur s'est produite. Veuillez réessayer."
          ); // Afficher un message d'erreur du serveur
        }
      })
      .catch((error) => {
        setError("Une erreur s'est produite. Veuillez réessayer."); // Afficher un message d'erreur en cas d'échec de la requête
      });
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      width: "450px",
      height: "520px",
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: " #06579D",
    },
  };

  return (
    <div>
      <button className={styles.buttonUp} onClick={() => setIsOpen(true)}>
        s'inscrire
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <div className={styles.container}>
          <div className={styles.logoContainer}></div>
          <h1 className={styles.h1}>Créez un compte</h1>
          <div className={styles.input}>
            <input
              type="text"
              placeholder="Prénom"
              className={styles.in}
              onChange={(e) => setPrenomUp(e.target.value)}
              value={prenomUp}
            />
            <input
              type="text"
              placeholder="Nom"
              className={styles.in}
              onChange={(e) => setNomUp(e.target.value)}
              value={nomUp}
            />
            <input
              type="email"
              placeholder="Email"
              className={styles.in}
              onChange={(e) => setEmailUp(e.target.value)}
              value={emailUp}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.in}
              onChange={(e) => setPasswordUp(e.target.value)}
              value={passwordUp}
            />
          </div>
        </div>
        <div className={styles.buttonUp3}>
          <button className={styles.buttonUp2} onClick={handleRegister}>
            s'inscrire
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </Modal>
    </div>
  );
}
