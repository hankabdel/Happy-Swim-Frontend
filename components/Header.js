import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user.value);

  const profileLink = user.token ? "/profileInfo" : "/profile";
  const textBienvenue = user.token ? `Bienvenue ${user.prenom}` : "";

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.text}>
          <h2 className={styles.textColor}>{textBienvenue}</h2>
        </div>

        <div className={styles.icon}>
          <Link href="/recherche">
            <FontAwesomeIcon
              className={styles.icon1}
              icon={faMagnifyingGlass}
            />
          </Link>
          <Link href="/">
            <FontAwesomeIcon className={styles.icon1} icon={faHouse} />
          </Link>
          <Link href="/mesFavoris">
            <FontAwesomeIcon className={styles.icon1} icon={faHeart} />
          </Link>
          <Link href={profileLink}>
            <FontAwesomeIcon className={styles.icon1} icon={faUser} />
          </Link>
        </div>
      </div>
    </div>
  );
}
