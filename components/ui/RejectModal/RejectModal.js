import Image from "next/image"
import Subsection from "../Subsection"
import Button from "../Button"

import styles from "./reject-modal.module.scss"

const RejectModal = ({ application, onDelete, closeModal }) => {
  return(
    <div className={styles.wrapper}>
      <Image
        src="/images/illustrations/reject-application.svg"
        width={391}
        height={391}
        alt=""
        priority
      />
      <Subsection title="Ты уверен(а), что хочешь отозвать заявку?" className={styles.message}>
        <div className={styles.education}>
          <p><b>Название вуза: {" "}</b>{application.university_obj.title}</p>
          <p><b>Название программы: {" "}</b>{application.educational_program_obj.title}</p>
        </div>
        <span>
          После отзыва заявки, ты не сможешь её 
          восстановить или повторно подать в текущей волне зачисления.
        </span>
      </Subsection>
      <div className={styles.buttons}>
        <Controls styles={styles} closeModal={closeModal} onDelete={onDelete}/>
      </div>
    </div>
  )
}

const Controls = ({styles, closeModal, onDelete}) => (
  <>
    <Button variant="ghost" onClick={closeModal}>
      Отменить
    </Button>
    
    <Button className={styles.rejectButton} onClick={(()=>{
      onDelete()
      closeModal
    })}>
      Отозвать заявку
    </Button>
  </>
);



export default RejectModal