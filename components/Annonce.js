// Importation des modules et des styles nécessaires
import styles from "../styles/Annonce.module.css"; // Importation des styles CSS pour ce composant
import React, { useEffect, useState } from "react"; // Importation de React et des hooks useEffect et useState
import { useDispatch, useSelector } from "react-redux"; // Importation des hooks de Redux
import { addMesFavoris, removeMesFavoris } from "../reducers/mesFavoris"; // Importation des actions Redux
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importation du composant FontAwesomeIcon pour les icônes
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Importation de l'icône cœur de FontAwesome
import Modal from "react-modal"; // Importation du composant Modal

// function pour passer les test jest

// export function calculateTotalPrice(pricePerPerson, numPeople) {
//   const total = pricePerPerson * numPeople;
//   return total;
// }

// Définition du composant fonctionnel Annonce
export default function Annonce() {
  // Déclaration des états pour les modales et l'annonce sélectionnée
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  // État pour stocker les données des annonces récupérées du backend
  const [annonceData, setAnnonceData] = useState([]);

  // Récupération des fonctions dispatch et des états du store Redux
  const dispatch = useDispatch();
  const favoris = useSelector((state) => state.mesFavoris.value);
  const user = useSelector((state) => state.user.value);

  // États pour les détails de la réservation
  const [date, setDate] = useState("");
  const [personne, setPersonne] = useState(1);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("21:00");
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Utilisation de useEffect pour récupérer les annonces lorsque le composant est monté
  useEffect(() => {
    fetch("http://localhost:3000/annonces/recover", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAnnonceData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [user.token]);

  // Gestion de l'ajout et de la suppression des favoris
  const handleToggleFavori = (annonce) => {
    const isFavori = favoris.some((e) => e._id === annonce._id);
    if (!isFavori) {
      dispatch(addMesFavoris({ ...annonce }));
      console.log("Add favoris");
    } else {
      dispatch(removeMesFavoris({ id: annonce._id, ...annonce }));
    }
  };

  // Enregistrement d'une réservation
  const handleRegisterReservation = () => {
    fetch("http://localhost:3000/reservations/addReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        titre: selectedAnnonce.titre,
        date: date,
        heureDebut: startTime,
        heureFin: endTime,
        personne: personne,
        ville: selectedAnnonce.ville,
        prix: price,
        annonceId: selectedAnnonce._id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Erreur lors de la réservation.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setIsReservationModalOpen(false); // Fermeture de la modal de réservation en cas de succès
      })
      .catch((error) => {
        console.error("Error during reservation:", error);
      });
  };

  // Styles personnalisés pour les modales
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      width: "470px",
      height: "580px",
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(32 54 73)",
    },
  };
  const reservationModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.0)",
    },
    content: {
      width: "470px",
      height: "580px",
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(32 54 73)",
    },
  };

  // Gestion du changement du nombre de personnes
  const handlePersonneChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPersonne(value);
    calculateTotalPrice(price, value);
  };

  // Calcul du prix total
  const calculateTotalPrice = (pricePerPerson, numPeople) => {
    const total = pricePerPerson * numPeople;
    setTotalPrice(total);
  };

  // Mise à jour du prix total lors du changement de l'annonce sélectionnée
  useEffect(() => {
    if (selectedAnnonce) {
      setPrice(selectedAnnonce.prix);
      calculateTotalPrice(selectedAnnonce.prix, personne);
    }
  }, [selectedAnnonce]);

  // Gestion de l'ouverture de la modal principale
  const handleOpenMainModal = (annonce) => {
    setSelectedAnnonce(annonce);
    setIsMainModalOpen(true);
  };

  // Gestion de la fermeture de la modal principale
  const handleCloseMainModal = () => {
    setSelectedAnnonce(null);
    setIsMainModalOpen(false);
  };

  // Gestion de l'ouverture de la modal de réservation
  const handleOpenReservationModal = () => {
    setIsReservationModalOpen(true);
  };

  // Gestion de la fermeture de la modal de réservation
  const handleCloseReservationModal = () => {
    setIsReservationModalOpen(false);
  };

  // Rendu du composant
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.annonceContainer}>
          {annonceData.map((annonce, i) => {
            const isFavori = favoris.some((e) => e._id === annonce._id);
            let iconStyle = isFavori ? { color: "red" } : { color: "white" };
            return (
              <div
                className={styles.card}
                key={i}
                onClick={() => handleOpenMainModal(annonce)}
              >
                <img
                  className={styles.imageFond}
                  src="image/image37.png"
                  alt="image"
                />
                <div className={styles.info}>
                  <h2>{annonce.titre}</h2>
                  <p>ville: {annonce.ville}</p>
                  <p>Prix: {annonce.prix}€</p>
                </div>
                <Modal
                  isOpen={
                    selectedAnnonce &&
                    selectedAnnonce._id === annonce._id &&
                    isMainModalOpen
                  }
                  onRequestClose={handleCloseMainModal}
                  style={customStyles}
                  ariaHideApp={false}
                  shouldCloseOnOverlayClick={true}
                >
                  <div
                    className={isReservationModalOpen ? styles.hidden : ""}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={styles.imageText}>
                      <img
                        className={styles.imageModal}
                        src="image/image37.png"
                        alt="image"
                      />
                      <h2>{annonce.titre}</h2>
                    </div>
                    <div className={styles.villePrix}>
                      <h3 className={styles.vP}>{annonce.description}</h3>
                      <p className={styles.vP}>ville: {annonce.ville}</p>
                      <p className={styles.vP}>Prix: {annonce.prix}€</p>
                    </div>
                    <div className={styles.heart}>
                      <div className={styles.buttonModal}>
                        <button
                          className={styles.button}
                          onClick={handleOpenReservationModal}
                        >
                          Réserver une annonce
                        </button>
                      </div>
                      <div className={styles.buttonModal}>
                        <button
                          onClick={handleCloseMainModal}
                          className={styles.button}
                        >
                          Fermer
                        </button>
                      </div>
                      <div>
                        <FontAwesomeIcon
                          className={styles.heartIcon}
                          style={iconStyle}
                          onClick={() => handleToggleFavori(annonce)}
                          icon={faHeart}
                        />
                      </div>
                    </div>
                  </div>
                </Modal>
                <Modal
                  isOpen={isReservationModalOpen}
                  onRequestClose={handleCloseReservationModal}
                  style={reservationModalStyles}
                  ariaHideApp={false}
                >
                  <h2 className={styles.textReservation}>
                    Ajoutez une date et un créneau
                  </h2>
                  <div className={styles.date}>
                    <div className={styles.dateText}>
                      <p className={styles.text}>Date</p>
                      <input
                        className={styles.input}
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.time}>
                      <div className={styles.startTime}>
                        <p className={styles.text}>Heure de début</p>
                        <input
                          className={styles.input}
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          required
                        />
                      </div>
                      <div className={styles.endTime}>
                        <p className={styles.text}>Heure de fin</p>
                        <input
                          className={styles.input}
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.inAp}>
                    <div className={styles.personne}>
                      <p className={styles.text}>Adultes</p>
                      <input
                        className={styles.input}
                        type="number"
                        value={personne}
                        min="1"
                        onChange={handlePersonneChange}
                        required
                      />
                    </div>
                    <div className={styles.totalPrice}>
                      <p className={styles.text}>Total prix:</p>
                      <input
                        className={styles.input}
                        type="text"
                        value={`${totalPrice} €`}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.buttonReserver}>
                    <button
                      className={styles.button}
                      onClick={handleRegisterReservation}
                    >
                      Réserver
                    </button>
                  </div>
                </Modal>
              </div>
            );
          })}
          <div className={styles.cardScroll}></div>
        </div>
      </div>
    </div>
  );
}
