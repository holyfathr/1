import { Controller, useForm } from "react-hook-form"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import Select from "components/ui/Select"
import Subsection from "components/ui/Subsection"
import InstitutionAnalytics from "components/partials/InstitutionAnalytics"

import withProtection from "hocs/with-protection"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import styles from "./analytics.module.scss"

const AnalyticsPage = () => {
  const { control, watch } = useForm()
  const faculty = watch("faculty")

  const { data: analytics } = useDefinedQuery(keys.account.university.analytics)
  const { data: facultyAnalytics } = useDefinedQuery(
    keys.account.university.faculty(faculty).analytics,
    { enabled: !!faculty }
  )

  if (!analytics) return null

  return (
    <Layout title="Аналитика">
      <Page title="Аналитика ПК ВУЗ" contentClassName={styles.wrapper}>
        <InstitutionAnalytics analytics={analytics} />
        <Subsection title="Аналитика по факультету">
          {analytics.faculties.length > 0 ? (
            <Controller
              control={control}
              name="faculty"
              render={({ field }) => (
                <Select
                  placeholder="Выберите факультет"
                  options={analytics.faculties}
                  valueKey="id"
                  labelKey="title"
                  className={styles.select}
                  {...field}
                />
              )}
            />
          ) : (
            <p>Нет данных</p>
          )}
        </Subsection>

        {facultyAnalytics && <InstitutionAnalytics analytics={facultyAnalytics} />}
      </Page>
    </Layout>
  )
}

export default withProtection(AnalyticsPage, "U")
