import styles from "../styles/ProfileInfo.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "react-modal";
import {
  addAnnonce,
  removeAnnonce,
  removeAllAnnonce,
} from "../reducers/annonce";
import { logout } from "../reducers/user";
import Link from "next/link";

export default function profileInfo() {
  const user = useSelector((state) => state.user.value);
  const annonceReducer = useSelector((state) => state.annonce.value);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [ville, setVille] = useState("");
  const [personne, setPersonne] = useState("");
  const [prix, setPrix] = useState("");
  const [titre, setTitre] = useState("");
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

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllAnnonce());
  };

  const handleAdd = () => {
    fetch("http://localhost:3000/annonces/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        titre: titre,
        description: description,
        ville: ville,
        personne: personne,
        prix: prix,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("DATA WHEN ADD BDD", data);
        if (data.result) {
          dispatch(addAnnonce(data.data));
          // console.log("-----data", data.data);
          setDescription("");
          setVille("");
          setPersonne("");
          setPrix("");
          console.log("---->hello", annonceReducer);
        }
      });
    setIsOpen(false);
  };

  const handleRemove = () => {
    console.log("hello front");
    fetch(`http://localhost:3000/annonces/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("------>sup", data);
        if (data.result) {
          console.log("true", data.annonceId);
          dispatch(removeAnnonce({ _id: data.annonceId }));
          console.log("hello reducer------->", annonceReducer);
          setDescription("");
          setVille("");
          setPersonne("");
          setPrix("");
        }
      });
    console.log(annonceReducer);
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
            Ajouter Annonce
          </button>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
          >
            <div className={styles.container}>
              <h1 className={styles.h1}>Ajouter une annonce</h1>
              <div className={styles.input}>
                <input
                  type="text"
                  placeholder="Le titre de votre annonce"
                  className={styles.in}
                  onChange={(e) => setTitre(e.target.value)}
                  value={titre}
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
                  placeholder="la ville de votre piscine ?
                  "
                  className={styles.in}
                  onChange={(e) => setVille(e.target.value)}
                  value={ville}
                ></input>

                <input
                  type="number"
                  placeholder="Combien de personnes"
                  className={styles.in}
                  min="1"
                  onChange={(e) => setPersonne(e.target.value)}
                  value={personne}
                ></input>
                <input
                  type="number"
                  placeholder="prix"
                  min="1"
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
                    onClick={() => handleAdd()}
                  >
                    Créez votre annonce +
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className={styles.supprimer} onClick={() => handleRemove()}>
          <button className={styles.button}>Supprimer Annonce</button>
        </div>
        <Link href="/mesReservation">
          <div className={styles.buttonMesReservations}>
            <button className={styles.button}>Mes réservation</button>
          </div>
        </Link>
        <Link href="/mesAnnonce">
          <div className={styles.buttonMesAnnonces}>
            <button className={styles.button}>Mes annonces</button>
          </div>
        </Link>
        <div className={styles.deconnectezVous}>
          <Link href="/">
            <button className={styles.button} onClick={() => handleLogout()}>
              Déconnectez-vous
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}