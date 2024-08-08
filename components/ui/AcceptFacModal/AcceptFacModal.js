import Image from "next/image"
import Subsection from "../Subsection"
import Button from "../Button"

import styles from "./accept-fac-modal.module.scss"

const AcceptFacModal = ({ application, onAccept, closeModal }) => {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/images/illustrations/accept-modal.svg"
        width={391}
        height={391}
        alt=""
        priority
      />
      <Subsection
        title="Ты готов(а) подать согласие на зачисление"
        className={styles.message}
      >
        {/* <div className={styles.education}>
          <p>
            <b>Название вуза: </b>
            {application.university_obj.title}
          </p>
          <p>
            <b>Название программы: </b>
            {application.educational_program_obj.title}
          </p>
        </div> */}
        <span>
          <p>
            В случае, если абитуриенту требуется виза для прибытия на территорию РФ, Вы
            сможете отправить визовое приглашение на въезд в самом заявлении после
            получения согласия на зачисление.
          </p>
          <p>
            <b style={{ fontWeight: "700" }}>
              Перечень дополнительных документов, необходимых для отправления визового
              приглашения на въезд в соответствии с правилами и условиями приема вуза, Вы
              должны будете запросить у абитуриента напрямую.
            </b>
          </p>
        </span>
      </Subsection>
      <div className={styles.buttons}>
        <Controls styles={styles} closeModal={closeModal} onAccept={onAccept} />
      </div>
    </div>
  )
}

const Controls = ({ styles, closeModal, onAccept }) => (
  <>
    <Button variant="ghost" onClick={closeModal}>
      Назад
    </Button>

    <Button
      className={styles.rejectButton}
      onClick={() => {
        onAccept()
        closeModal()
      }}
    >
      Одобрить заявку
    </Button>
  </>
)

export default AcceptFacModal
