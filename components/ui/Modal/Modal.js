import clsx from "clsx"
import { useRef } from "react"
import ReactModal from "react-modal"

import useScrollLock from "hooks/use-scroll-lock"

import styles from "./modal.module.scss"

ReactModal.setAppElement("#__next")

const Modal = ({ show, onClose, className, children, ...props }) => {
  const ref = useRef(null)

  const preClose = () => {
    const form = ref.current.querySelector("form[data-dirty=true]")
    if (form && !window.confirm("Вы точно хотите закрыть окно?")) return

    onClose()
  }

  useScrollLock(show)

  className = clsx(styles.modal, className)

  return (
    <ReactModal
      isOpen={show}
      onRequestClose={preClose}
      className={className}
      overlayClassName={styles.modalOverlay}
      data={{ "scroll-lock-scrollable": "" }}
      {...props}
      contentRef={(node) => (ref.current = node)}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
