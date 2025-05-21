import styles from "../styles/ProfileInfo.module.css"; // Importation des styles pour ce composant
import { useSelector, useDispatch } from "react-redux"; // Importation des hooks Redux pour accéder à l'état et dispatcher des actions
import { useState } from "react"; // Importation du hook useState pour gérer l'état local
import Modal from "react-modal"; // Importation du composant Modal pour afficher des fenêtres modales
import {
  addAnnonce,
  removeAnnonce,
  removeAllAnnonce,
} from "../reducers/annonce"; // Importation des actions Redux pour gérer les annonces
import { logout } from "../reducers/user"; // Importation de l'action Redux pour déconnecter l'utilisateur
import Link from "next/link"; // Importation du composant Link de Next.js pour la navigation entre les pages
import { backendURL } from "../public/URLs";

// Configuration de Cloudinary avec les variables d'environnement
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Déclaration du composant ProfileInfo
export default function ProfileInfo() {
  // Accès aux valeurs de l'utilisateur et des annonces dans le store Redux
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch(); // Hook pour dispatcher des actions

  // Déclaration des états locaux pour gérer les champs du formulaire et l'état de la modal
  const [isOpen, setIsOpen] = useState(false);
  const [ville, setVille] = useState("");
  const [personne, setPersonne] = useState("");
  const [prix, setPrix] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Styles personnalisés pour la modal
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

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllAnnonce());
  };

  // Fonction pour uploader l'image sur Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "HappySwim"); // Spécification du dossier

    try {
      console.log("Tentative d'upload vers Cloudinary avec :", {
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        folder: "HappySwim",
      });

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Réponse de Cloudinary :", data);
      return data.secure_url;
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image:", error);
      return null;
    }
  };

  // Fonction pour ajouter une annonce
  const handleAdd = async () => {
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    fetch(`${backendURL}/annonces/`, {
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
        image: imageUrl, // Ajout de l'URL de l'image
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addAnnonce(data.data));
          setDescription("");
          setVille("");
          setPersonne("");
          setPrix("");
          setImage(null);
        }
      });
    alert("Annonce Ajoutée Avec Succès");
    setIsOpen(false);
  };

  // Fonction pour supprimer une annonce
  const handleRemove = () => {
    fetch(
      `${backendURL}/annonces`,
      // `http://localhost:3000/annonces`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          console.log("true", data.annonceId);
          dispatch(removeAnnonce({ _id: data.annonceId })); // Dispatch de l'action pour supprimer l'annonce du store
          // Réinitialisation des champs du formulaire
          setDescription("");
          setVille("");
          setPersonne("");
          setPrix("");
        }
      });
    alert("Annonce Supprimer");
    setIsOpen(false); // Fermeture de la modal
  };

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <img className={styles.icon} src="/profile.png" alt="iconProfile"></img>
        <div className={styles.textProfile}>
          <h3 className={styles.info}>Prénom: {user.prenom} </h3>
          <h3 className={styles.info}>Nom: {user.nom} </h3>
          <h3 className={styles.info}>Email: {user.email}</h3>
        </div>
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
                  placeholder="La ville de votre piscine ?
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
