import { useState } from "react"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import toast from "react-hot-toast"
import { Router } from "next/router"
import NextNProgress from "nextjs-progressbar"
import Head from "next/head"
import { Context as ResponsiveContext } from "react-responsive"
import { appWithTranslation } from "next-i18next"

import Toaster from "components/proxies/Toaster"

import use100vh from "hooks/use-100vh"

import "styles/reset.scss"
import "styles/fonts.scss"
import "styles/commons.scss"

import { QUERY_CLIENT_CONFIG } from "config"

Router.events.on("routeChangeStart", () => toast.dismiss())

const defaultResponsiveValue = {
  width: 1920,
  height: 1080,
}

const App = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient(QUERY_CLIENT_CONFIG))

  use100vh()

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1e60f6" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>

        <NextNProgress />
        <Toaster />

        {typeof window !== "undefined" ? (
          <Component {...pageProps} />
        ) : (
          <ResponsiveContext.Provider value={defaultResponsiveValue}>
            <Component {...pageProps} />
          </ResponsiveContext.Provider>
        )}
      </Hydrate>
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)