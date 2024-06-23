// Importation des modules et des styles nécessaires
import styles from "../styles/Header.module.css"; // Importation des styles CSS pour ce composant
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importation du composant FontAwesomeIcon pour les icônes
import {
  faUser,
  faHeart,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"; // Importation des icônes spécifiques de FontAwesome
import Link from "next/link"; // Importation du composant Link de Next.js pour les liens
import { useSelector } from "react-redux"; // Importation du hook useSelector de Redux

// Définition du composant fonctionnel Header
export default function Header() {
  // Récupération de l'état user depuis le store Redux
  const user = useSelector((state) => state.user.value);

  // Définition des liens et du texte de bienvenue en fonction de la connexion de l'utilisateur
  const profileLink = user.token ? "/profileInfo" : "/profile";
  const textBienvenue = user.token ? `Bienvenue ${user.prenom}` : "";

  // Rendu du composant
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

// useSelector est utilisé pour accéder à l'état global de Redux,
// en particulier pour obtenir les informations sur l'utilisateur.

// profileLink et textBienvenue sont conditionnels et changent en fonction
// de la connexion de l'utilisateur (user.token).

// Les icônes de FontAwesome sont utilisées pour les liens de navigation.

// Link de Next.js est utilisé pour une navigation côté client,
// ce qui permet de naviguer entre les pages sans recharger complètement la page.
