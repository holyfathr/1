import Image from "next/image"
import Subsection from "../Subsection"
import Button from "../Button"

import styles from "./accept-modal.module.scss"

const AcceptModal = ({ application, onAccept, closeModal }) => {
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
            Согласие на зачисление нужно подать в тот вуз, который ты выбрал(а) для
            поступления.
          </p>
          <p>
            <b style={{fontWeight: "700"}}>
              Ты можешь подать согласие на зачисление только в один вуз и на одно
              направление.
            </b>{" "}
            Если ты подавал(а) согласие на зачисление куда-либо ещё, оно будет
            автоматически отозвано.
          </p>
          <p>
            Если тебе требуется виза, вуз подготовит визовое приглашение и отправит его
            тебе по почте. Копия приглашения также будет доступна на странице заявки.
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
      Отменить
    </Button>

    <Button
      className={styles.rejectButton}
      onClick={() => {
        onAccept()
        closeModal()
      }}
    >
      Подать согласие
    </Button>
  </>
)

export default AcceptModal
