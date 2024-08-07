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

import errorHandler from "helpers/error-handler"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import withProtection from "hocs/with-protection"

import {
  deleteApplication,
  passApplicationAgreement,
  retractApplicationAgreement,
} from "api/application"

import { putApplication } from "api/account"

import styles from "./applications.module.scss"
import StatusCard from "components/ui/StatusCard"
import StatusesCard from "components/ui/StatusesCard"

const ApplicationPage = ({ id }) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: application } = useDefinedQuery(keys.account.entrant.application(id))

  const passMutation = useMutation(passApplicationAgreement, { onError: errorHandler })
  const deleteMutation = useMutation(deleteApplication, { onError: errorHandler })
  const retractMutation = useMutation(retractApplicationAgreement, {
    onError: errorHandler,
  })
  const putMutation = useMutation(putApplication, {
    onError: errorHandler,
  })

  const updateApplicationsQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey.includes("application"),
    })
  }

  const onAccept = async () => {
    const alert = toast.loading("Передача согласия...")

    try {
      await putMutation.mutateAsync({
        id,
        entrant_status: "A",
      })
      await updateApplicationsQueries()

      toast.success("Согласие передано", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  const onReject = async () => {
    const alert = toast.loading("Передача отказа...")

    try {
      await putMutation.mutateAsync({
        id,
        entrant_status: "W",
      })
      await updateApplicationsQueries()

      toast.success("Отказ передан", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
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
      <StatusesCard.Statuses>
        <Statuses application={application} />
        <StatusesFromFac application={application} />
      </StatusesCard.Statuses>
      <StatusesCard.Header>
        <Header application={application} onAccept={onAccept} onReject={onReject} />
      </StatusesCard.Header>
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

const Header = ({ application, onReject, onAccept }) => {
  let headerMessage
  let buttons = null

  if (application.withdrawn) {
    headerMessage = "Абитуриент отозвал заявку, далее работать с заявкой невозможно."
  }
  // if (application.university_status === "P") {
  //   headerMessage = "Визовое приглашение"
  // }
  if (application.entrant_status === "P" && application.university_status === "D") {
    headerMessage = "Вуз получил твою заявку и рассмотрит её в установленный срок."
    buttons = (
      <div className={styles.buttons}>
        <Button
          variant="ghost"
          href={`/programs/${application.educational_program_obj.id}`}
        >
          Подробнее о программе
        </Button>
        <button className={styles.rejBtn} onClick={onReject}>
          Отклонить
        </button>
      </div>
    )
  }
  if (application.university_status === "A" && application.entrant_status === "P") {
    headerMessage =
      "Вуз одобрил твою заявку. Теперь тебе нужно принять решение и подать согласие на зачисление только в один вуз."
    buttons = (
      <div className={styles.buttons}>
        <button className={styles.rejBtn} onClick={onReject}>
          Отозвать
        </button>
        <Button onClick={onAccept}>Подать согласие</Button>
      </div>
    )
  }
  if (application.entrant_status === "W") {
    headerMessage = ""
  }

  return (
    <div className={styles.header}>
      {!application.entrant_status === "W" && (
        <div className={styles.headerText}>
          <p>{headerMessage}</p>
        </div>
      )}
      {application.entrant_status === "P" && application.university_status === "A" && (
        <div className={styles.headerText}>
          <p>{headerMessage}</p>
        </div>
      )}
      {buttons}
    </div>
  )
}

const Statuses = ({ application }) => {
  let statusMessage

  if (application.university_status === "A" || application.university_status === "I") {
    statusMessage = "Ожидается твой ответ"
  }
  if (
    (application.university_status === "A" && application.entrant_status === "A") ||
    (application.entrant_status === "A" && application.university_status === "V")
  ) {
    statusMessage = "Подано согласие"
  }

  if (application.entrant_status === "W") {
    statusMessage = "Отклонена"
  }

  return (
    <>
      {application.entrant_status === "A" && (
        <StatusCard completed>{statusMessage}</StatusCard>
      )}
      {application.university_status === "A" && application.entrant_status === "P" && (
        <StatusCard secondary>{statusMessage}</StatusCard>
      )}
      {application.entrant_status === "W" && (
        <StatusCard>{statusMessage}</StatusCard>
      )}
    </>
  )
}

const StatusesFromFac = ({ application }) => {
  let statusMessage

  if (application.entrant_status === "P") {
    statusMessage = "Ожидает рассмотрения"
  }
  if (application.university_status === "R") {
    statusMessage = "Отклонена"
  }
  if (application.university_status === "I") {
    statusMessage = "Не соответствует требованиям"
  }
  if (application.university_status === "A") {
    statusMessage = "Одобрена"
  }
  if (application.university_status === "V" && application.entrant_status === "A") {
    statusMessage = "Получено визовое приглашение"
  }

  return (
    <>
      {/* {application.university_status !== "A" && application.entrant_status !== "A" && (
        <StatusCard completed>{statusMessage}</StatusCard>
      )}
      {application.university_status === "V" && application.entrant_status === "A" && (
        <StatusCard completed>{statusMessage}</StatusCard>
      )} */}
      {!(application.university_status === "A" && application.entrant_status === "A") ||
        (application.entrant_status === "A" && application.university_status === "V" && (
          <StatusCard completed>{statusMessage}</StatusCard>
        ))}
      {application.university_status === "D" && application.entrant_status === "P" && (
        <StatusCard secondary>{statusMessage}</StatusCard>
      )}
      {application.university_status === "V" && application.entrant_status === "A" && (
        <StatusCard completed>{statusMessage}</StatusCard>
      )}
    </>
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
