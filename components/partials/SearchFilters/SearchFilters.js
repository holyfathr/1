import { useMediaQuery } from "react-responsive"

import DesktopSearchFilters from "./desktop/"
import MobileSearchFilters from "./mobile/"

const SearchFilters = ({ filters }) => {
  const isDesktop = useMediaQuery({ minWidth: 750 })

  return isDesktop ? (
    <DesktopSearchFilters filters={filters} />
  ) : (
    <MobileSearchFilters filters={filters} />
  )
}

export default SearchFilters
