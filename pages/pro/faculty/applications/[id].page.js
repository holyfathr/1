import { useEffect } from "react"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import cloneDeep from "lodash/cloneDeep"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import Button from "components/ui/Button"
import Personal from "components/containers/ApplicationReviewSections/Personal"
import NationalityDetails from "components/containers/ApplicationReviewSections/NationalityDetails"
import Contacts from "components/containers/ApplicationReviewSections/Contacts"
import Documents from "components/containers/ApplicationReviewSections/Documents"
import Additional from "components/containers/ApplicationReviewSections/Additional"
import Priority from "components/containers/ApplicationReviewSections/Priority"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import withProtection from "hocs/with-protection"

import styles from "./applications.module.scss"

const ApplicationPage = ({ id }) => {
  const router = useRouter()
  const methods = useForm()

  const { data: application } = useDefinedQuery(keys.account.faculty.application(id))

  console.log(application)

  useEffect(() => {
    if (!application) return

    const defaultValues = cloneDeep(application)
    defaultValues.programs = [
      {
        ...application.educational_program_obj,
      },
    ]

    methods.reset(defaultValues)
  }, [application, methods])

  if (!application) return "Загрузка..."

  return (
    <Layout title={`Заявка №${application.id}`}>
      <Page title={`${application.educational_program_obj.title}: Заявка №${application.id}`}>
        <FormProvider {...methods}>
          <div className={styles.application}>
            <Personal overview application={application} />
            <Contacts application={application} />
            <NationalityDetails application={application} />
            <Documents overview application={application}/>
            <Additional overview application={application}/>
            <Priority application={application}/>
          </div>
        </FormProvider>

        <Button variant="ghost" onClick={router.back} className={styles.back}>
          Назад
        </Button>
      </Page>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  return { paths: [], fallback: "blocking" }
}

export const getStaticProps = async ({ params: { id } }) => {
  id = Number(id)

  return {
    props: {
      id,
    },
  }
}

export default withProtection(ApplicationPage, "F")
