import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import Button from "components/ui/Button"
import Documents from "./sections/Documents"
import Features from "./sections/Features"
import University from "./sections/University"
import Faculty from "./sections/Faculty"
import Dvi from "./sections/Dvi"
import Contacts from "./sections/Contacts"
import DviResults from "./sections/DviResults"
import VisaInvitationForm from "components/forms/VisaInvitationForm/VisaInvitationForm"

import errorHandler from "helpers/error-handler"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import withProtection from "hocs/with-protection"

import {
  deleteApplication,
  passApplicationAgreement,
  retractApplicationAgreement,
} from "api/application"

import styles from "./applications.module.scss"

const ApplicationPage = ({ id }) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: application } = useDefinedQuery(keys.account.entrant.application(id))

  const passMutation = useMutation(passApplicationAgreement, { onError: errorHandler })
  const deleteMutation = useMutation(deleteApplication, { onError: errorHandler })
  const retractMutation = useMutation(retractApplicationAgreement, {
    onError: errorHandler,
  })

  const updateApplicationsQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey.includes("application"),
    })
  }

  const onPassAgreement = async () => {
    const alert = toast.loading("Передача согласия...")

    try {
      await passMutation.mutateAsync({ id })
      await updateApplicationsQueries()

      toast.success("Согласие передано", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  const onRetractAgreement = async () => {
    const alert = toast.loading("Отзыв согласия...")

    try {
      await retractMutation.mutateAsync({ id })
      await updateApplicationsQueries()

      toast.success("Согласие отозвано", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  const onDelete = async () => {
    const alert = toast.loading("Отзыв заявки...")

    try {
      await deleteMutation.mutateAsync({ id })
      await updateApplicationsQueries()

      await router.push({ pathname: "/applications/", query: { after_delete: true } })
    } catch {
      toast.dismiss(alert)
    }
  }

  console.log(application)

  if (!application) return null

  return (
    <Layout title={application.educational_program_title}>
      <Page
        title={application.educational_program_title}
        controls={
          <Buttons
            application={application}
            onRetractAgreement={onRetractAgreement}
            onDelete={onDelete}
          />
        }
        contentClassName={styles.subsections}
      >
        <VisaInvitationForm/>
        <Features application={application} />
        <University application={application} />
        <Faculty application={application} />
        <Dvi application={application} />
        <DviResults application={application} />
        <Documents />
        <Contacts application={application} />

        {!application.has_agreement && (
          <Button onClick={onPassAgreement}>Передать согласие</Button>
        )}
      </Page>
    </Layout>
  )
}

const Buttons = ({ application, onRetractAgreement, onDelete }) => (
  <div className={styles.buttons}>
    {application.has_agreement && (
      <Button variant="outline" onClick={onRetractAgreement}>
        Отозвать согласие
      </Button>
    )}

    <Button variant="outline" onClick={onDelete}>
      Отозвать заявку
    </Button>
  </div>
)

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

export default withProtection(ApplicationPage, "E")
