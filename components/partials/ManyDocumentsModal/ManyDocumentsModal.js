import Image from "next/image"
import { useRouter } from "next/router"

import Button from "components/ui/Button"

import useModal from "hooks/use-modal"

import styles from "./many-documents-modal.module.scss"

const ManyDocumentsModal = () => {
  const { back } = useRouter()
  const { Modal, close } = useModal(true)

  return (
    <Modal className={styles.modal}>
      <Image src="/images/illustrations/documents.svg" width={400} height={297} alt="" />
      <h2>Подготовь документы перед подачей заявления</h2>
      <div className={styles.list}>
        <div className={styles.column}>
          <p>1. Паспорт</p>
          <p>
            а) стр. с фотографией
            <br />
            б) стр. с регистрацией
            <br />
            в) 18-19 стр. «Сведения о ранее выданных паспортах»
          </p>
          <p>2. Снилс</p>
          <p>3. Фото 3х4 (ч/б или цветное)</p>
        </div>
        <div className={styles.column}>
          <p>4. Документ об образовании (аттестат)</p>
          <p>5. Приложение к документу об образовании (все страницы)</p>
          <p>6. Документы, подтверждающие индивидуальные достижения (при наличии)</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button variant="ghost" onClick={back}>
          Назад
        </Button>
        <Button onClick={close}>Я подготовил</Button>
      </div>
    </Modal>
  )
}

export default ManyDocumentsModal
