import { useCallback, useState } from "react"

import ModalComponent from "components/ui/Modal"

/**
 * Provides a convenient way of working
 * with modal windows.
 *
 * @param {boolean} initialState - The initial visibility
 * state of the modal
 *
 * @returns Object with modal component, open and close functions.
 */
const useModal = (initialState = false) => {
  const [show, setShow] = useState(initialState)

  const open = useCallback(() => setShow(true), [])
  const close = useCallback(() => setShow(false), [])

  const Modal = useCallback(
    (props) => <ModalComponent onClose={close} show={show} {...props} />,
    [close, show]
  )

  return { Modal, open, close }
}

export default useModal
