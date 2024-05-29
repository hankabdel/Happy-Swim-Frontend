import styles from "../styles/Annonce.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMesFavoris, removeMesFavoris } from "../reducers/mesFavoris";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

export default function Annonce() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  const [annonceData, setAnnonceData] = useState([]);
  const dispatch = useDispatch();
  const favoris = useSelector((state) => state.mesFavoris.value);
  const user = useSelector((state) => state.user.value);

  const [date, setDate] = useState("");
  const [personne, setPersonne] = useState(1);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("21:00");
  const [price, setPrice] = useState(0); // Add state for price per person
  const [totalPrice, setTotalPrice] = useState(0); // Add state for total price

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
        // console.log("----->data", data);
        setAnnonceData(data.data);
        // console.log("annonce--------->", annonceData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleToggleFavori = (annonce) => {
    const isFavori = favoris.some((e) => e._id === annonce._id);
    if (!isFavori) {
      dispatch(addMesFavoris({ ...annonce }));
      console.log("Add favoris");
    } else {
      dispatch(removeMesFavoris({ id: annonce._id, ...annonce })); //  ...annonce il vas vérifier dans toutes les annonces qui port un ID
    }
    // console.log("aaaaaaa", selectedAnnonce._id);
  };

  const handleRegisterResrvation = () => {
    fetch("http://localhost:3000/reservations/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },

      body: JSON.stringify({
        date: date,
        heureDebut: startTime,
        heureFin: endTime,
        personne: personne,
        prix: price,
        annonceId: selectedAnnonce._id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la réservation.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Traitez la réponse ici
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
      backgroundColor: "rgb(32 54 73)",
    },
  };

  const closeModal = (e) => {
    e.preventDefault(); // Empêche tout comportement par défaut
    setSelectedAnnonce(null); // Fermez le modal
  };

  const handlePersonneChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPersonne(value);
    calculateTotalPrice(price, value);
  };

  const calculateTotalPrice = (pricePerPerson, numPeople) => {
    const total = pricePerPerson * numPeople;
    setTotalPrice(total);
  };

  useEffect(() => {
    if (selectedAnnonce) {
      setPrice(selectedAnnonce.prix);
      calculateTotalPrice(selectedAnnonce.prix, personne);
    }
  }, [selectedAnnonce]);

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
                onClick={() => setSelectedAnnonce(annonce)}
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
                    selectedAnnonce && selectedAnnonce._id === annonce._id
                  }
                  onRequestClose={closeModal}
                  style={customStyles}
                  ariaHideApp={false}
                  shouldCloseOnOverlayClick={true}
                  onClick={() => setIsOpen(true)}
                >
                  <div onClick={(e) => e.stopPropagation()}>
                    <img
                      className={styles.imageModal}
                      src="image/image37.png"
                      alt="image"
                    />

                    <h2>{annonce.titre}</h2>
                    <p>ville: {annonce.ville}</p>
                    <p>Prix: {annonce.prix}€</p>
                    <div className={styles.heart}>
                      <button
                        className={styles.button}
                        onClick={() => setIsOpen(true)}
                      >
                        Réserver une annonce
                      </button>
                      <div>
                        <FontAwesomeIcon
                          className={styles.heartIcon}
                          style={iconStyle}
                          onClick={() => handleToggleFavori(annonce)}
                          icon={faHeart}
                        />
                      </div>
                      <Modal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        style={customStyles}
                        ariaHideApp={false}
                      >
                        <h2 className={styles.textReservation}>
                          Ajoutez une date et un créneau
                        </h2>
                        <div className={styles.date}>
                          <p className={styles.text}>Date</p>
                          <input
                            className={styles.input}
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
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
                          <p className={styles.text}>
                            Total prix: {totalPrice} €
                          </p>
                          <input
                            className={styles.input}
                            type="text"
                            value={`${totalPrice} €`}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        <button
                          className={styles.button}
                          onClick={() => handleRegisterResrvation()}
                        >
                          Réserver
                        </button>
                      </Modal>
                    </div>
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
