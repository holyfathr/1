import { useMediaQuery } from "react-responsive"

import DesktopSearchOptions from "./desktop/"

const SearchOptions = (props) => {
  const isDesktop = useMediaQuery({ minWidth: 750 })

  return isDesktop ? <DesktopSearchOptions {...props} /> : null
}

export default SearchOptions
