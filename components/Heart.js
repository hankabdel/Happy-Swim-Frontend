import React from "react";
import styles from "../styles/HeartIcon.module.css";

const HeartIcon = () => {
  return (
    <label className={styles.uiBookmark}>
      <input type="checkbox" />
      <div className={styles.bookmark}>
        <svg
          viewBox="0 0 16 16"
          style={{ marginTop: "4px" }}
          className="bi bi-heart-fill"
          height="25"
          width="25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
    </label>
  );
};

export default HeartIcon;
