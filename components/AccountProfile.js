import styles from "../styles/Profile.module.css";
import React from "react";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

function AccountProfile() {
  return (
    <div className={styles.container}>
      <div className={styles.image}></div>
      <div className={styles.textContainer}>
        <div className={styles.text}>
          <h1 className={styles.h1}>Soyez les bienvenus</h1>
          <p className={styles.ph}>Créez un compte</p>
        </div>
        <div className={styles.buttom}>
          <div className={styles.buttomSingUp}>
            <SignUp />
          </div>
          <p className={styles.pSing}>Vous avez déjà un compte?</p>
          <div className={styles.buttomSingIn}>
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;
