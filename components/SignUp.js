import styles from "../styles/SignUp.module.css";
import { useState } from "react";
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

  const router = useRouter();
  if (user.token) {
    router.push("/");
  }

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
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
          dispatch(login({ nom: nomUp, token: data.token }));
          setPrenomUp("");
          setNomUp("");
          setPasswordUp("");
        }
      });
  };

  // const handleLougout = () => {
  //   dispatch(logout());
  // };

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
            ></input>
            <input
              type="text"
              placeholder="Nom"
              className={styles.in}
              onChange={(e) => setNomUp(e.target.value)}
              value={nomUp}
            ></input>

            <input
              type="email"
              placeholder="Email"
              className={styles.in}
              onChange={(e) => setEmailUp(e.target.value)}
              value={emailUp}
            ></input>
            <input
              type="password"
              placeholder="Password"
              className={styles.in}
              onChange={(e) => setPasswordUp(e.target.value)}
              value={passwordUp}
            ></input>
          </div>
        </div>
        <div className={styles.buttonUp3}>
          <button className={styles.buttonUp2} onClick={() => handleRegister()}>
            s'inscrire
          </button>
        </div>
      </Modal>
    </div>
  );
}
