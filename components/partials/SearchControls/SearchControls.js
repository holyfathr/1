import SearchFiltersContainer from "components/containers/SearchFiltersContainer"
import SearchOptionsContainer from "components/containers/SearchOptionsContainer"

import styles from "./search-controls.module.scss"

const SearchControls = () => {
  return (
    <div className={styles.controls}>
      <SearchFiltersContainer />
      <SearchOptionsContainer />
    </div>
  )
}

export default SearchControls
