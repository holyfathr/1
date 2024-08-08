import clsx from "clsx"
import Link from "next/link"

import ActionButton from "components/ui/ActionButton"
import Button from "components/ui/Button"
import StatusCard from "components/ui/StatusCard"
import StatusesCard from "components/ui/StatusesCard"
import Row from "../Row"
import HighlightV2 from "../HighlightV2"
import ProgramBreadcrumbs from "components/partials/ProgramBreadcrumbs"
import RejectModal from "../RejectModal"

import {
  getFormOfEducationTitle,
  getLevelOfEducationDegreeTitle,
  getQualifyTestType,
} from "helpers/enums"
import { formatPrice } from "helpers/language"
import { getProgramLanguage } from "helpers/enums"
import useModal from "hooks/use-modal"

import styles from "./application-card.module.scss"

const ApplicationCard = ({ application, onDelete, className, ...props }) => {
  const { Modal, open, close } = useModal()
  className = clsx(styles.wrapper, className)

  const program = application.educational_program_obj

  console.log(program)

  return (
    <>
      <Modal>
        <RejectModal application={application} onReject={onDelete} closeModal={close} />
      </Modal>
      <StatusesCard className={className} {...props}>
        <StatusesCard.Statuses>
          <Statuses application={application} />
          <StatusesFromFac application={application} />
        </StatusesCard.Statuses>

        <StatusesCard.Content className={styles.application}>
          <div>
            <ProgramBreadcrumbs program={application} className={styles.breadcrumbs} />
            <h2>
              <Link href={`/programs/${program.id}`}>
                <a className={styles.title} target="_blank">
                  {program.title}
                </a>
              </Link>
            </h2>
            <Row>
              <div className="highlightCollumn">
                {program.form_of_education && (
                  <HighlightV2
                    title={"Уровень образования"}
                    value={getLevelOfEducationDegreeTitle(program.level_of_education)}
                  />
                )}
                {application.languages && (
                  <HighlightV2
                    title={"Язык(и) обучения"}
                    value={getProgramLanguage(application.languages)}
                  />
                )}
                {application.language && (
                  <HighlightV2
                    title={"Язык(и) обучения"}
                    value={getProgramLanguage(application.language)}
                  />
                )}
                {Number.isFinite(program.commerce_cost) && (
                  <HighlightV2
                    title={"Стоимость обучения"}
                    value={formatPrice(program.commerce_cost)}
                  />
                )}
              </div>
              <div className="highlightCollumn">
                {program.level_of_education && (
                  <HighlightV2
                    title={"Форма обучения"}
                    value={getFormOfEducationTitle(program.form_of_education)}
                  />
                )}
                {application?.dvi[0]?.type && (
                  <HighlightV2
                    title={"Вступительные испытания"}
                    value={getQualifyTestType(application.dvi[0].type)}
                  />
                )}
                <HighlightV2 title={"Вступительные испытания"} value={program.duration} />
              </div>
            </Row>
          </div>

          <div className={styles.buttons}>
            <Controls application={application} onDelete={open} styles={styles} />
          </div>
        </StatusesCard.Content>
      </StatusesCard>
    </>
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
    </>
  )
}

const Controls = ({ application, onDelete, styles }) => (
  <>
    <ActionButton
      icon="arrow-right"
      href={`/applications/${application.id}/`}
      className={styles.button}
    >
      Подробнее
    </ActionButton>

    {onDelete && (
      <Button onClick={onDelete} className={styles.rejectButton}>
        Отозвать
      </Button>
    )}
  </>
)

export default ApplicationCard
