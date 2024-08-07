import ProgramHeader from "components/partials/ProgramHeader"
import FavouriteContainer from "components/containers/FavouriteContainer"

import styles from "./header.module.scss"

const Header = ({ program }) => (
  <header className={styles.header}>
    <ProgramHeader program={program} />
    <FavouriteContainer program={program} className={styles.favourite} />
  </header>
)

export default Header
