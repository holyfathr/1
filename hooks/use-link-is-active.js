import { useRouter } from "next/router"

/**
 * Determines whether the given link is currently
 * active (navigated to).
 *
 * @param {string|undefined} link - Link to check
 *
 * @returns Whether the given link is active or not
 */
const useLinkIsActive = (link) => {
  const { asPath } = useRouter()

  // Remove URL parameters
  const sanitizedPath = asPath.split("#")[0].split("?")[0]

  return link === sanitizedPath
}

export default useLinkIsActive
