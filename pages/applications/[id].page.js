import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import useModal from "hooks/use-modal"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import Button from "components/ui/Button"

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
import Personal from "./sections/Personal"
import Contacts from "./sections/Contacts"
import NationalityDetails from "./sections/NationalityDetails"
import Documents from "./sections/Documents"
import Additional from "./sections/Additional"
import Priority from "components/containers/ApplicationReviewSections/Priority"
import RejectModal from "components/ui/RejectModal"
import AcceptModal from "components/ui/AcceptModal/AcceptModal"
import Icon from "components/ui/Icon"

const ApplicationPage = ({ id }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const methods = useForm()

  const { Modal, open, close } = useModal()

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

  console.log(application)

  if (!application) return null

  return (
    <Layout title={application.educational_program_title}>
      <Modal>
        <RejectModal application={application} onReject={onReject} closeModal={close} />
      </Modal>
      <Modal>
        <AcceptModal application={application} onAccept={onAccept} closeModal={close} />
      </Modal>
      <Page
        title={application.educational_program_title}
        contentClassName={styles.subsections}
        controls={
          <Buttons application={application} onRetractAgreement={onRetractAgreement} />
        }
      >
        <div className={styles.statusBar}>
          <StatusesCard.Statuses>
            <Statuses application={application} />
            <StatusesFromFac application={application} />
          </StatusesCard.Statuses>
          <StatusesCard.Header>
            <Header
              application={application}
              onAccept={onAccept}
              onReject={onReject}
              onOpen={open}
            />
          </StatusesCard.Header>
        </div>
        <FormProvider {...methods}>
          <div className={styles.application}>
            <Personal overview application={application} />
            <Contacts application={application} />
            <NationalityDetails application={application} />
            <Documents overview application={application} />
            <Additional overview application={application} />
            <Priority application={application} />
          </div>
        </FormProvider>

        {/* {!application.has_agreement && (
          <Button onClick={onPassAgreement}>Передать согласие</Button>
        )} */}
      </Page>
    </Layout>
  )
}

const Header = ({ application, onReject, onAccept, onOpen }) => {
  let headerMessage
  let buttons = null
  let icon

  if (application.withdrawn) {
    headerMessage = "Абитуриент отозвал заявку, далее работать с заявкой невозможно."
  }
  if (application.entrant_status === "P" && application.university_status === "I") {
    headerMessage =
      "Вуз запросил недостающую информацию или изменения по заявке. Мы свяжемся с тобой с дальнейшими инструкциями в скором времени"
    icon = "warning-icon"
  }
  // if (application.university_status === "P") {
  //   headerMessage = "Визовое приглашение"
  // }
  if (application.entrant_status === "P" && application.university_status === "D") {
    headerMessage = "Вуз получил твою заявку и рассмотрит её в установленный срок."
    icon = "wait-icon"
    buttons = (
      <div className={styles.buttons}>
        <Button
          variant="ghost"
          href={`/programs/${application.educational_program_obj.id}`}
        >
          Подробнее о программе
        </Button>
        <Button className={styles.rejBtn} onClick={onOpen}>
          Отклонить
        </Button>
      </div>
    )
  }
  if (application.university_status === "A" && application.entrant_status === "P") {
    headerMessage =
      "Вуз одобрил твою заявку. Теперь тебе нужно принять решение и подать согласие на зачисление только в один вуз."
    icon = "correct-icon"
    buttons = (
      <div className={styles.buttons}>
        <button className={styles.rejBtn} onClick={onReject}>
          Отозвать
        </button>
        <Button onClick={onOpen}>Подать согласие</Button>
      </div>
    )
  }
  if (application.university_status === "R") {
    headerMessage =
      "К сожалению, вуз отклонил твою заявку. Ты можешь дождаться ответа по оставшимся заявкам или попробовать податься куда-то ещё."
    icon = "incorrect-icon"
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
      {application.entrant_status === "P" && application.university_status === "I" && (
        <div className={styles.headerText}>
          <div>
            <Icon slug={icon} className={styles.icon} />
          </div>
          <p>{headerMessage}</p>
        </div>
      )}
      {application.entrant_status === "P" && application.university_status === "D" && (
        <div className={styles.headerText}>
          <p>{headerMessage}</p>
        </div>
      )}
      {application.university_status === "R" && (
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
      {application.university_status === "I" && application.entrant_status === "P" && (
        <StatusCard secondary>
          <Icon slug="wait-dot" className={styles.dot} />
          {statusMessage}
        </StatusCard>
      )}
      {application.entrant_status === "W" && <StatusCard>{statusMessage}</StatusCard>}
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

  if (application.university_status === "I" && application.entrant_status === "P") {
    statusMessage = "Не соответствует требованиям"
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
      {application.university_status === "A" && application.entrant_status === "P" && (
        <StatusCard completed>{statusMessage}</StatusCard>
      )}
      {application.university_status === "I" && application.entrant_status === "P" && (
        <StatusCard warning>
          <Icon slug="war-dot" className={styles.dot} />
          {statusMessage}
        </StatusCard>
      )}
      {application.university_status === "R" && <StatusCard>{statusMessage}</StatusCard>}
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
