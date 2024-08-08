import { useEffect } from "react"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import cloneDeep from "lodash/cloneDeep"
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import useModal from "hooks/use-modal"
import useDefinedQuery, { keys } from "hooks/use-defined-query"
import errorHandler from "helpers/error-handler"

import Layout from "components/partials/Layout"
import Page from "components/partials/Page"
import Button from "components/ui/Button"
import Personal from "components/containers/ApplicationReviewSections/Personal"
import NationalityDetails from "components/containers/ApplicationReviewSections/NationalityDetails"
import Contacts from "components/containers/ApplicationReviewSections/Contacts"
import Documents from "components/containers/ApplicationReviewSections/Documents"
import Additional from "components/containers/ApplicationReviewSections/Additional"
import Priority from "components/containers/ApplicationReviewSections/Priority"
import WrongModal from "components/ui/WrongModal/WrongModal"
import VisaInvitationForm from "components/forms/VisaInvitationForm/VisaInvitationForm"
import StatusesCard from "components/ui/StatusesCard"
import StatusCard from "components/ui/StatusCard"
import AcceptModal from "components/ui/AcceptModal/AcceptModal"
import AcceptFacModal from "components/ui/AcceptFacModal/AcceptFacModal"

import { formatDateString } from "helpers/language"
import { putApplicationFac, putUniversityComment } from "api/account"

import withProtection from "hocs/with-protection"

import styles from "./applications.module.scss"
import Icon from "components/ui/Icon"

const ApplicationPage = ({ id }) => {
  const router = useRouter()
  const methods = useForm()
  const queryClient = useQueryClient()
  const {
    Modal: CorrectModal,
    open: openCorModal,
    close: closeCorModal,
  } = useModal()
  const {
    Modal: InCorrentModal,
    open: openInCorModal,
    close: closeInCorModal,
  } = useModal()

  const { data: application } = useDefinedQuery(keys.account.faculty.application(id))
  const putMutation = useMutation(putApplicationFac, {
    onError: errorHandler,
  })
  const putUniversityMutation = useMutation(putUniversityComment, {
    onError: errorHandler,
  })

  const updateApplicationsQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey.includes("application"),
    })
  }

  // const onComment = async () => {
  //   const alert = toast.loading("Передача комментария...")

  //   try {
  //     await putUniversityMutation.mutateAsync({
  //       id,
  //       university_status: "R",
  //     })
  //     await updateApplicationsQueries()

  //     toast.success("Комментарий передан", { id: alert })
  //   } catch {
  //     toast.dismiss(alert)
  //   }
  // }

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
    <Layout title={`Заявка №${application.id}`}>
      <StatusesCard.Statuses>
        <Statuses application={application} />
        <StatusesFromEntrant application={application} />
        <div className={styles.applicationDate}>
          Дата подачи: {formatDateString(application.date)}
        </div>
      </StatusesCard.Statuses>
      <Page
        title={`${application.educational_program_obj.title}: Заявка №${application.id}`}
        contentClassName={styles.page}
      >
        <InCorrentModal>
          <WrongModal application={application} closeModal={closeInCorModal} />
        </InCorrentModal>
        <CorrectModal>
          <AcceptFacModal
            application={application}
            onAccept={onAccept}
            closeModal={closeCorModal}
          />
        </CorrectModal>

        <StatusesCard.Header>
          <Header
            application={application}
            onReject={onReject}
            onAccept={onAccept}
            onOpenCor={openCorModal}
            onOpenInCor = {openInCorModal}
            onPendingVisa={onPendingVisa}
          />
        </StatusesCard.Header>
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
            <Icon slug="green-dot" className={styles.dot} />
            {statusMessage}
          </StatusCard>
        ))}
      {application.university_status === "D" && application.entrant_status === "P" && (
        <StatusCard secondary>
          <Icon slug="wait-dot" className={styles.dot} />
          {statusMessages}
        </StatusCard>
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

const Header = ({ application, onReject, onAccept, onOpenCor, onOpenInCor, onPendingVisa }) => {
  let headerMessage
  let icon
  let buttons = null

  if (application.entrant_status === "W" && application.university_status === "A") {
    headerMessage = "Абитуриент отозвал заявку, далее работать с заявкой невозможно."
    icon = "incorrect-icon"
  }

  if (application.entrant_status === "W" && application.university_status === "D") {
    headerMessage = "Абитуриент отозвал заявку, далее работать с заявкой невозможно."
    icon = "incorrect-icon"
  }

  if (application.university_status === "V" && application.entrant_status === "A") {
    headerMessage =
      "Абитуриент подал согласие на зачисление. Если требуется, Вы можете отправить визовое приглашение на въезд в РФ в самой заявке."
    icon = "correct-icon"
  }

  if (application.university_status === "A" && application.entrant_status === "A") {
    headerMessage =
      "Абитуриент подал согласие на зачисление. Если требуется, Вы можете отправить визовое приглашение на въезд в РФ в самой заявке."
    icon = "correct-icon"
  }

  if (application.university_status === "A" && application.entrant_status === "P") {
    headerMessage = "Вы одобрили заявку, ожидается решение от абитуриента."
    icon = "correct-icon"
  }

  if (application.entrant_status === "P" && application.university_status === "R") {
    headerMessage = "Вы отклонили заявку, далее работать с заявкой невозможно."
    icon = "warning-icon"
  }

  if (application.entrant_status === "P" && application.university_status === "D") {
    headerMessage = "Вам нужно приступить к рассмотрению заявки."
    icon = "wait-icon"
    buttons = (
      <div className={styles.buttons}>
        <Button variant="ghost" href={`/pro/falulty/table`}>
          Решить позже
        </Button>
        <Button className={styles.rejectButton} onClick={onReject}>
          Отклонить
        </Button>
        <Button onClick={onOpenCor}>Одобрить</Button>
        <Button variant="ghost" onClick={onOpenInCor}>
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
        <div>
          <Icon slug={icon} className={styles.icon} />
        </div>
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
