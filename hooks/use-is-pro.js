import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

/**
 * Determines whether current user
 * is pro or not.
 *
 * @returns {boolean} Whether the current user is pro or not
 */
const useIsPro = () => {
  const { pathname } = useRouter()
  const [isPro, setIsPro] = useState(undefined)

  const { data: account } = useDefinedQuery(keys.account)

  useEffect(() => {
    const hasProRole = ["F", "U", "A"].includes(account?.role)
    const isProPage = pathname.startsWith("/pro/")

    setIsPro(hasProRole || isProPage)
  }, [account, pathname])

  return isPro
}

export default useIsPro
