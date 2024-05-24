import styles from "../styles/Annonce.module.css";
import React from "react";
import { useEffect, useState } from "react";
import Heart from "./Heart";

export default function Annonce() {
  const [annonceData, setAnnonceData] = useState([]);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [adresse, setAdresse] = useState("");
  const [personne, setPersonne] = useState("");
  const [prix, setPrix] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/annonces/recover", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response) {
          throw new Error("error not ok");
        }
        return response.json();
      })
      .then((annonce) => {
        console.log("----->data", annonce);
        setAnnonceData(annonce.data);
      });
  }, []);

  const handleCopyAnnonce = (annonce) => {
    history.push({
      pathname: "/mesFavoris",
      state: { annonce: annonce },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.annonceContainer}>
          {annonceData.map((annonce, i) => (
            <div className={styles.card} key={i}>
              <img
                className={styles.imageFond}
                src="image/image37.png"
                alt="image"
              />
              <div className={styles.info}>
                <h2>{annonce.titre}</h2>
                <p>Adresse : {annonce.adresse}</p>
                <p>Prix : {annonce.prix}</p>
                <div className={styles.heart}>
                  <Heart onClick={() => handleCopyAnnonce()} />
                </div>
              </div>
            </div>
          ))}

          <div className={styles.cardScroll}></div>
        </div>
      </div>
    </div>
  );
}
