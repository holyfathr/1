import { useMemo } from "react"
import Head from "next/head"
import { useTranslation } from "next-i18next"

import Header from "components/partials/Header"

const Layout = ({ title, flatHeader, children }) => {
  const { t } = useTranslation("common")

  const formattedTitle = useMemo(() => {
    if (title) return `${title} — Almater`
    return "Almater — поступи в вуз мечты без лишних усилий"
  }, [title])

  return (
    <>
      <Head>
        <title>{formattedTitle}</title>
      </Head>

      <Header flat={flatHeader} />

      {children}
    </>
  )
}

export default Layout