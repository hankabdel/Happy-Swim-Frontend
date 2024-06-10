import styles from "../styles/SignIn.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { login } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isOpenIn, setIsOpenIn] = useState(false);
  const [emailIn, setEmailIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");

  const router = useRouter();
  if (user.token) {
    // console.log("---->je charge");
    router.push("/");
  }

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ email: emailIn, password: passwordIn }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              email: emailIn,
              token: data.token,
              nom: data.nom,
              prenom: data.prenom,
            })
          );
          setEmailIn("");
          setPasswordIn;
        }
      });
  };

  const customStylesIn = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    content: {
      width: "450px",
      height: "470px",
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
      <button className={styles.buttonIn} onClick={() => setIsOpenIn(true)}>
        se connecter
      </button>
      <Modal
        isOpen={isOpenIn}
        onRequestClose={() => setIsOpenIn(false)}
        style={customStylesIn}
      >
        <div className={styles.container}>
          <h1 className={styles.h1}>Connectez-vous</h1>
          <div className={styles.inputIn}>
            <input
              type="email"
              placeholder="E-mail"
              className={styles.inIn}
              onChange={(e) => setEmailIn(e.target.value)}
              value={emailIn}
            ></input>
            <input
              type="Password"
              placeholder="Password"
              className={styles.inIn}
              onChange={(e) => setPasswordIn(e.target.value)}
              value={passwordIn}
            ></input>
          </div>
          <div className={styles.buttonIn3}>
            <button
              className={styles.buttonIn2}
              onClick={() => handleConnection()}
            >
              se connecter
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
