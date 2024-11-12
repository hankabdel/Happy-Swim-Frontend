// Importation des modules et des styles nécessaires
import styles from "../styles/Annonce.module.css"; // Importation des styles CSS pour ce composant
import React, { useEffect, useState } from "react"; // Importation de React et des hooks useEffect et useState
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importation du composant FontAwesomeIcon pour les icônes
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Importation de l'icône cœur de FontAwesome
import Modal from "react-modal"; // Importation du composant Modal
import { useDispatch, useSelector } from "react-redux"; // Importation des hooks Redux
import { addMesFavoris, removeMesFavoris } from "../reducers/mesFavoris"; // Importation des actions Redux
import { backendURL } from "../public/URLs";

// Définition du composant fonctionnel Annonce
const AnnonceCard = (props) => {
  // Déclaration des états pour les modales et l'annonce sélectionnée
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [reservationAnnonce, setReservationAnnonce] = useState([]);
  // État pour stocker les données des annonces récupérées du backend
  const [annonceData, setAnnonceData] = useState([]);

  // Récupération des données et actions via les props
  const { user, onRegisterReservation } = props;
  // Gestion des favoris avec Redux
  const dispatch = useDispatch();
  const favoris = useSelector((state) => state.mesFavoris.value); // Récupère les favoris depuis Redux
  // États pour les détails de la réservation
  const [date, setDate] = useState("");
  const [personne, setPersonne] = useState(1);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("21:00");
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Utilisation de useEffect pour récupérer les annonces lorsque le composant est monté
  useEffect(() => {
    const fetchAnnonces = async () => {
      if (user && user.token) {
        try {
          const response = await fetch(
            `${backendURL}/annonces`,
            // "http://localhost:3000/annonces",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des annonces");
          }

          const data = await response.json();
          setAnnonceData(data.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des annonces :", error);
        }
      }
    };
    fetchAnnonces();
  }, [user && user.token]);

  // Gestion de l'ajout et de la suppression des favoris via Redux
  const handleToggleFavori = (annonce) => {
    const isFavori = favoris.some((e) => e._id === annonce._id);
    if (!isFavori) {
      dispatch(addMesFavoris(annonce)); // Ajoute l'annonce aux favoris
    } else {
      dispatch(removeMesFavoris(annonce)); // Supprime l'annonce des favoris
    }
  };

  // Enregistrement d'une réservation
  const handleRegisterReservation = () => {
    if (date && startTime && endTime) {
      onRegisterReservation({
        titre: reservationAnnonce.titre,
        date: date,
        heureDebut: startTime,
        heureFin: endTime,
        personne: personne,
        ville: reservationAnnonce.ville,
        prix: totalPrice,
        annonceId: reservationAnnonce._id,
      });
      handleCloseMainModal();
      handleCloseReservationModal();
    } else {
      console.error("Veuillez remplir tous les champs nécessaires.");
    }
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
  }, [selectedAnnonce, personne]);

  // Gestion de l'ouverture de la modal principale
  const handleOpenMainModal = (annonce) => {
    setSelectedAnnonce(annonce);
    setIsMainModalOpen(true);
  };

  // Gestion de la fermeture de la modal principale
  const handleCloseMainModal = () => {
    setSelectedAnnonce(null); // Réinitialiser l'annonce sélectionnée
    setIsMainModalOpen(false); // Fermer la modal principale
  };

  // Gestion de l'ouverture de la modal de réservation
  const handleOpenReservationModal = () => {
    setReservationAnnonce(selectedAnnonce); // Fixe l'annonce pour la réservation
    setIsReservationModalOpen(true);
  };

  // Gestion de la fermeture de la modal de réservation
  const handleCloseReservationModal = () => {
    setReservationAnnonce(null); // Réinitialise l'annonce de réservation
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
                  src="https://res.cloudinary.com/dnr5cehaa/image/upload/v1729874685/image37_xi5sfs.png"
                  alt="image"
                />
                <div className={styles.info}>
                  <h2>{annonce.titre}</h2>
                  <p>Ville: {annonce.ville}</p>
                  <p>Prix: {annonce.prix}€</p>
                </div>
                <Modal
                  isOpen={
                    isMainModalOpen &&
                    selectedAnnonce &&
                    selectedAnnonce._id === annonce._id
                  }
                  onRequestClose={handleCloseMainModal}
                  style={customStyles}
                  ariaHideApp={false}
                  shouldCloseOnOverlayClick={true}
                >
                  {selectedAnnonce && (
                    <div
                      className={isReservationModalOpen ? styles.hidden : ""}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={styles.imageText}>
                        <img
                          className={styles.imageModal}
                          src="https://res.cloudinary.com/dnr5cehaa/image/upload/v1729874685/image37_xi5sfs.png"
                          alt="image"
                        />
                        <h2>{selectedAnnonce.titre}</h2>{" "}
                      </div>
                      <div className={styles.villePrix}>
                        <h3 className={styles.vP}>
                          {selectedAnnonce.description}
                        </h3>
                        <p className={styles.vP}>
                          Ville: {selectedAnnonce.ville}
                        </p>
                        <p className={styles.vP}>
                          Prix: {selectedAnnonce.prix}€
                        </p>
                      </div>
                      <div className={styles.heart}>
                        <div className={styles.buttonModal}>
                          <button
                            className={styles.button}
                            onClick={handleOpenReservationModal} // Ouvrir la modal de réservation
                          >
                            Réserver une annonce
                          </button>
                        </div>
                        <div className={styles.buttonModal}>
                          <button
                            onClick={handleCloseMainModal} // Ferme la modal principale
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
                  )}
                </Modal>
                <Modal
                  isOpen={reservationAnnonce && isReservationModalOpen}
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
                        readOnly
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
};
export default AnnonceCard;
