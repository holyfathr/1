import { useEffect } from "react"
import NProgress from "nprogress"

/**
 * Shows loading spinner while something is fetching.
 *
 * @param {boolean} isFetching - Whether fetching process is active
 */
const useFetchingIndicator = (isFetching) => {
  useEffect(() => {
    if (isFetching) NProgress.start()
    else NProgress.done()
  }, [isFetching])

  return null
}

export default useFetchingIndicator
