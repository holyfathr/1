import { useMediaQuery } from "react-responsive"
import { FormProvider, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"
import { dehydrate, QueryClient } from "react-query"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import Controls from "./sections/Controls"
import Bar from "./sections/Bar"
import Results from "./sections/Results"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import styles from "./search.module.scss"

const SearchPage = () => {
  const { t } = useTranslation("search")
  const [defaultValues, setDefaultValues] = useState({ search: "", filters: {} })
  const methods = useForm({ defaultValues })

  const { data: filters } = useDefinedQuery(keys.searchFilters)

  useDeepCompareEffect(() => {
    const defaultFilters = Object.entries(filters).reduce((result, [key, filter]) => {
      if (filter.type === "select") {
        result[key] = []
      } else if (filter.type === "pick") {
        result[key] = ""
      } else if (filter.type === "range") {
        result[key + "__gte"] = ""
        result[key + "__lt"] = ""
      }

      return result
    }, {})

    setDefaultValues({ search: "", filters: defaultFilters })
  }, [filters])

  useEffect(() => {
    methods.reset(defaultValues)
  }, [defaultValues, methods])

  const isDesktop = useMediaQuery({ minWidth: 750 })

  return (
    <Layout title={t("pageTitle")}>
      <FormProvider {...methods} defaultValues={defaultValues}>
        <Page
          title={t("educationalProgramSearch")}
          controls={isDesktop ? <Bar /> : undefined}
          contentClassName={styles.page}
        >
          <Controls />
          <Results />
        </Page>
      </FormProvider>
    </Layout>
  )
}

export const getStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient()

  const { name, fn } = keys.searchFilters
  await queryClient.prefetchQuery(name, fn)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ["common", "header",  "stat-card", "search"])),
    },
  }
}

export default SearchPage
