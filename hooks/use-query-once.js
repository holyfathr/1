import pick from "lodash/pick"
import omit from "lodash/omit"
import isMatchWith from "lodash/isMatchWith"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef } from "react"

/**
 * Calls the given function once
 * query key matches the given value. Once
 * called, query key is removed from query.
 *
 * If value is undefined, query key
 * is checked for existence only.
 *
 * @param {object} criteria - Object of query keys and corresponding
 * values to check against
 * @param {function} callback - Function to call on match
 */
const useQueryOnce = (criteria, callback) => {
  const isHandling = useRef(false)
  const router = useRouter()

  const handleQuery = useCallback(async () => {
    isHandling.current = true

    const { query, pathname } = router
    const keys = Object.keys(criteria)

    // Hide keys from history
    const newQuery = omit(query, keys)
    await router.replace({ pathname, query: newQuery }, undefined, { shallow: true })

    callback(pick(query, keys))
    isHandling.current = false
  }, [callback, router])

  useEffect(() => {
    if (isHandling.current) return

    const meetsCriteria = isMatchWith(router.query, criteria, (objValue, srcValue) => {
      return objValue === srcValue || typeof srcValue === "undefined"
    })

    if (meetsCriteria) handleQuery()
  }, [router.query, criteria, handleQuery])

  return null
}

export default useQueryOnce
