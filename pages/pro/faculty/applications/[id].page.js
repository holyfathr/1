import { useEffect } from "react"
import { useRouter } from "next/router"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"
import cloneDeep from "lodash/cloneDeep"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import useModal from "hooks/use-modal"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import Button from "components/ui/Button"
import Personal from "components/forms/ApplicationForm/sections/Information/sections/Personal"
import NationalityDetails from "components/forms/ApplicationForm/sections/Information/sections/NationalityDetails"
import Contacts from "components/forms/ApplicationForm/sections/Information/sections/Contacts"
import Documents from "components/forms/ApplicationForm/sections/Information/sections/Documents"
import Additional from "components/forms/ApplicationForm/sections/Information/sections/Additional"
import Priority from "components/containers/ApplicationReviewSections/Priority"

import useDefinedQuery, { keys } from "hooks/use-defined-query"
import errorHandler from "helpers/error-handler"

import withProtection from "hocs/with-protection"

import styles from "./applications.module.scss"
import StatusesCard from "components/ui/StatusesCard"
import StatusCard from "components/ui/StatusCard"
import { putApplicationFac } from "api/account"
import FileUploadContainer from "components/containers/FileUploadContainer"
import Subsection from "components/ui/Subsection"
import WrongModal from "components/ui/WrongModal/WrongModal"
import VisaInvitationForm from "components/forms/VisaInvitationForm/VisaInvitationForm"

const ApplicationPage = ({ id }) => {
  const router = useRouter()
  const methods = useForm()
  const queryClient = useQueryClient()
  const { Modal, open, close } = useModal()

  const { data: application } = useDefinedQuery(keys.account.faculty.application(id))
  const putMutation = useMutation(putApplicationFac, {
    onError: errorHandler,
  })

  const updateApplicationsQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey.includes("application"),
    })
  }

  const onReject = async () => {
    const alert = toast.loading("Передача согласия...")

    try {
      await putMutation.mutateAsync({
        id,
        university_status: "R",
      })
      await updateApplicationsQueries()

      toast.success("Согласие передано", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  const onAccept = async () => {
    const alert = toast.loading("Передача согласия...")

    try {
      await putMutation.mutateAsync({
        id,
        university_status: "A",
      })
      await updateApplicationsQueries()

      toast.success("Согласие передано", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  const onPendingVisa = async () => {
    const alert = toast.loading("Передача приглашения...")

    try {
      await putMutation.mutateAsync({
        id,
        university_status: "V",
      })
      await updateApplicationsQueries()

      toast.success("Приглашение передано", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

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
    <>
      <Modal>
        <WrongModal application={application} closeModal={close} />
      </Modal>
      <Layout title={`Заявка №${application.id}`}>
        <StatusesCard.Statuses>
          <Statuses application={application} />
          <StatusesFromEntrant application={application} />
        </StatusesCard.Statuses>
        <StatusesCard.Header>
          <Header
            application={application}
            onReject={onReject}
            onAccept={onAccept}
            onOpen={open}
            onPendingVisa={onPendingVisa}
          />
        </StatusesCard.Header>

        <Page
          title={`${application.educational_program_obj.title}: Заявка №${application.id}`}
        >
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

          <Button variant="ghost" onClick={router.back} className={styles.back}>
            Назад
          </Button>
        </Page>
      </Layout>
    </>
  )
}

const Statuses = ({ application }) => {
  let statusMessages = []

  if (application.university_status === "A" && application.entrant_status === "A") {
    statusMessages.push("Получено согласие")
  } else if (
    application.university_status === "V" &&
    application.entrant_status === "A"
  ) {
    statusMessages.push("Получено согласие", "Отправлено визовое приглашение")
  } else {
    switch (application.university_status) {
      case "P":
        statusMessages.push("Отправлено визовое приглашение")
        break
      case "R":
        statusMessages.push("Отклонена")
        break
      case "I":
        statusMessages.push("Не соответствует требованиям")
        break
      case "A":
        statusMessages.push("Одобрена")
        break
      default:
        statusMessages.push("Ожидает рассмотрения")
    }
  }

  return (
    <>
      {application.university_status !== "D" &&
        application.entrant_status !== "W" &&
        statusMessages.map((statusMessage, index) => (
          <StatusCard
            key={index}
            completed={
              statusMessage === "Получено согласие" ||
              statusMessage === "Одобрена" ||
              statusMessage === "Отправлено визовое приглашение"
            }
            secondary={statusMessage === "Ожидает рассмотрения"}
          >
            {statusMessage}
          </StatusCard>
        ))}
      {application.university_status === "D" && application.entrant_status === "P" && (
        <StatusCard secondary>{statusMessages}</StatusCard>
      )}
    </>
  )
}

const StatusesFromEntrant = ({ application }) => {
  let statusMessage

  if (application.entrant_status === "W") {
    statusMessage = "Отозвана"
  }

  if (application.entrant_status === "P" && application.university_status === "A") {
    statusMessage = "Ожидается ответ абитуриента"
  }

  return (
    <>
      {/* {application.entrant_status !== "P" && application.entrant_status !== "A" && (
        <StatusCard completed>{statusMessage}</StatusCard>
      )} */}
      {application.entrant_status === "P" && application.university_status === "A" && (
        <StatusCard secondary>{statusMessage}</StatusCard>
      )}
      {application.university_status === "D" && application.entrant_status === "W" && (
        <StatusCard>{statusMessage}</StatusCard>
      )}
    </>
  )
}

const Header = ({ application, onReject, onAccept, onOpen, onPendingVisa }) => {
  let headerMessage
  let buttons = null

  if (application.entrant_status === "W" && application.university_status === "A") {
    headerMessage = "Абитуриент отозвал заявку, далее работать с заявкой невозможно."
  }

  if (application.entrant_status === "W" && application.university_status === "D") {
    headerMessage = "Абитуриент отозвал заявку, далее работать с заявкой невозможно."
  }

  if (application.university_status === "V" && application.entrant_status === "A") {
    headerMessage =
      "Абитуриент подал согласие на зачисление. Если требуется, Вы можете отправить визовое приглашение на въезд в РФ в самой заявке."
  }

  if (application.university_status === "A" && application.entrant_status === "A") {
    headerMessage =
      "Абитуриент подал согласие на зачисление. Если требуется, Вы можете отправить визовое приглашение на въезд в РФ в самой заявке."
  }

  if (application.university_status === "A" && application.entrant_status === "P") {
    headerMessage = "Вы одобрили заявку, ожидается решение от абитуриента."
  }

  if (application.entrant_status === "P" && application.university_status === "R") {
    headerMessage = "Вы отклонили заявку, далее работать с заявкой невозможно."
  }

  if (application.entrant_status === "P" && application.university_status === "D") {
    headerMessage = "Вам нужно приступить к рассмотрению заявки."
    buttons = (
      <div className={styles.buttons}>
        <Button variant="ghost">Решить позже</Button>
        <button className={styles.rejBtn} onClick={onReject}>
          Отклонить
        </button>
        <Button onClick={onAccept}>Одобрить</Button>
        <Button variant="ghost" onClick={onOpen}>
          Что-то не так?
        </Button>
      </div>
    )
  }
  // switch (application.university_status) {
  //   case "R":
  //     headerMessage = "Вы отклонили заявку, далее работать с заявкой невозможно."
  //     break
  //   case "I":
  //     headerMessage =
  //       "Вы запросили недостающую информацию или изменения по заявке, ожидается ответ от абитуриента."
  //     break
  //   case "P":
  //     headerMessage =
  //       "Абитуриент подал согласие на зачисление. Если требуется, Вы можете отправить визовое приглашение на въезд в РФ в самой заявке."
  //     break
  //   default:
  //     headerMessage = "Вам нужно приступить к рассмотрению заявки."
  //     buttons = (
  //       <div className={styles.buttons}>
  //         <Button variant="ghost">Решить позже</Button>
  //         <button className={styles.rejBtn} onClick={onReject}>
  //           Отклонить
  //         </button>
  //         <Button onClick={onAccept}>Одобрить</Button>
  //         <Button variant="ghost" onClick={onOpen}>
  //           Что-то не так?
  //         </Button>
  //       </div>
  //     )
  // }

  return (
    <div className={styles.header}>
      <div className={styles.headerText}>
        <p>{headerMessage}</p>
      </div>
      {application.university_status === "A" && application.entrant_status === "A" && (
        <VisaInvitationForm onNext={onPendingVisa} />
      )}
      {buttons}
    </div>
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
