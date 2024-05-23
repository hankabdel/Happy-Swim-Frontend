import styles from "../styles/ProfileInfo.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "react-modal";

export default function profileInfo() {
  const user = useSelector((state) => state.user.value);
  const [isOpen, setIsOpen] = useState(false);
  const [adresse, setAdresse] = useState("");
  const [personne, setPersonne] = useState("");
  const [prix, setPrix] = useState("");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

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

  const handleRegister = () => {
    const newAnnonce = {
      titre: text,
      description,
      adresse,
      personne,
      prix,
    };

    dispatch(addAnnonce(newAnnonce));
    setIsOpen(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <img className={styles.icon} src="/profile.png" alt="iconProfile"></img>
        <h3 className={styles.info}>Prénom: {user.prenom} </h3>
        <h3 className={styles.info}>Nom: {user.nom} </h3>
        <h3 className={styles.info}>Email: {user.email}</h3>
        <div className={styles.buttonAnnonce}>
          <button className={styles.button} onClick={() => setIsOpen(true)}>
            Annonce (0)
          </button>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
          >
            <div className={styles.container}>
              <h1 className={styles.h1}>Ajouter une annonce</h1>
              <div className={styles.input}>
                <input
                  type="text"
                  placeholder="Le titre de votre annonce"
                  className={styles.in}
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                ></input>

                <input
                  type="text"
                  placeholder="Décrivez-nous votre piscine"
                  className={styles.in}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></input>

                <input
                  type="text"
                  placeholder="l'adresse de votre piscine ?
                  "
                  className={styles.in}
                  onChange={(e) => setAdresse(e.target.value)}
                  value={adresse}
                ></input>

                <input
                  type="number"
                  placeholder="Combien de personnes"
                  className={styles.in}
                  onChange={(e) => setPersonne(e.target.value)}
                  value={personne}
                ></input>

                <input
                  type="number"
                  placeholder="prix"
                  className={styles.in}
                  onChange={(e) => setPrix(e.target.value)}
                  value={prix}
                ></input>
                <div className={styles.file}>
                  <label className={styles.button} for="avatar">
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                </div>
                <div className={styles.buttonAjouter}>
                  <button
                    className={styles.buttonUp2}
                    onClick={() => handleRegister()}
                  >
                    Créez votre annonce +
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
