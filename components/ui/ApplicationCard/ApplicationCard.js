import clsx from "clsx";
import Link from "next/link";

import ActionButton from "components/ui/ActionButton";
import Button from "components/ui/Button";
import StatusCard from "components/ui/StatusCard";
import StatusesCard from "components/ui/StatusesCard";
import Row from "../Row";
import HighlightV2 from "../HighlightV2";
import ProgramBreadcrumbs from "components/partials/ProgramBreadcrumbs";
import RejectModal from "../RejectModal";

import { getFormOfEducationTitle, getLevelOfEducationDegreeTitle, getQualifyTestType } from "helpers/enums";
import { formatPrice } from "helpers/language";
import { getProgramLanguage } from "helpers/enums"
import useModal from "hooks/use-modal"

import styles from "./application-card.module.scss";

const ApplicationCard = ({ application, onDelete, className, ...props }) => {
  const { Modal, open, close } = useModal()
  className = clsx(styles.wrapper, className);

  const program = application.educational_program_obj;

  console.log(program)

  return (
    <>
      <Modal>
        <RejectModal application={application} onDelete={onDelete} closeModal={close} />
      </Modal>
      <StatusesCard className={className} {...props}>
        <StatusesCard.Statuses>
          <Statuses application={application} />
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
                  <HighlightV2 title={"Уровень образования"} value={getLevelOfEducationDegreeTitle(program.level_of_education)} />
                )}
                {application.languages && (
                  <HighlightV2 title={"Язык(и) обучения"} value={getProgramLanguage(application.languages)} />
                )}
                {application.language && (
                  <HighlightV2 title={"Язык(и) обучения"} value={getProgramLanguage(application.language)} />
                )}
                {Number.isFinite(program.commerce_cost) && (
                  <HighlightV2 title={"Стоимость обучения"} value={formatPrice(program.commerce_cost)} />
                )}
              </div>
              <div className="highlightCollumn">
                {program.level_of_education && (
                  <HighlightV2 title={"Форма обучения"} value={getFormOfEducationTitle(program.form_of_education)} />
                )}
                {application?.dvi[0]?.type && (
                  <HighlightV2 title={"Вступительные испытания"} value={getQualifyTestType(application.dvi[0].type)} />
                )}
                <HighlightV2 title={"Вступительные испытания"} value={program.duration} />
              </div>
            </Row>
          </div>

          <div className={styles.buttons}>
            <Controls application={application} onDelete={open} styles={styles}/>
          </div>
        </StatusesCard.Content>
      </StatusesCard>

    </>
  );
};

const Statuses = ({ application }) => (
  <>
    {application.has_agreement ? (
      <StatusCard completed>Согласие подано</StatusCard>
    ) : (
      <StatusCard>Согласие не подано</StatusCard>
    )}
    <StatusCard>Заявление не обработано</StatusCard>
  </>
);

const Controls = ({ application, onDelete, styles }) => (
  <>
    <ActionButton icon="arrow-right" href={`/applications/${application.id}/`} className={styles.button}>
      Подробнее
    </ActionButton>

    {onDelete && (
      <Button onClick={onDelete} className={styles.rejectButton}>
        Отозвать
      </Button>
    )}
  </>
);

export default ApplicationCard;
