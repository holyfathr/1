/* eslint-disable */
import { useRouter } from "next/router"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

/**
 * Checks whether the current account has given role
 * to access protected content. If check fails,
 * user gets redirected to forbidden page. Otherwise,
 * the given component is rendered.
 *
 * @param {*} Component - Component to render upon successfull auth
 * @param {string|undefined} role - Role required to render the component.
 * If not specified, any logged in user can access the component.
 *
 * @returns Rendered component, loading label or null
 */
const withProtection =
  (Component, role = null) =>
  (props) => {
    const router = useRouter()

    const { data: account, isLoading } = useDefinedQuery(keys.account)
    if (isLoading) return null

    if (!account || (role && account.role !== role)) {
      router.replace("/forbidden/")
      return null
    }

    return <Component {...props} />
  }

export default withProtection
