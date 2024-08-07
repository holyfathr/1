import dynamic from "next/dynamic"
import { useState } from "react"

import ActionButton from "components/ui/ActionButton"
import EditableSubsection from "components/partials/EditableSubsection"
import ControlsWrapper from "components/ui/ControlsWrapper"
import EventsGrid from "components/partials/EventsGrid"
import EventCard from "components/ui/EventCard"
import IconButton from "components/ui/IconButton"

import useModal from "hooks/use-modal"

import styles from "./events-control.module.scss"

const EventFormContainer = dynamic(
  () => import("components/containers/EventFormContainer"),
  { loading: () => <p>Загрузка...</p> }
)

const EventsControl = ({ events, onAdd, onDelete, onEdit, ...props }) => {
  const { Modal, open, close } = useModal()
  const [event, setEvent] = useState(null)

  const onRequestEdit = (event) => {
    setEvent(event)
    open()
  }

  const preAdd = async (data) => {
    const result = await onAdd(data)
    if (result === true) close()
  }

  const preEdit = async (data) => {
    const result = await onEdit({ ...event, ...data })
    if (result === true) close()
  }

  const onClose = () => {
    setEvent(null)
  }

  return (
    <>
      <Modal onAfterClose={onClose}>
        <EventFormContainer
          onSubmit={event ? preEdit : preAdd}
          buttons={
            event ? <EditButtons onCancel={close} /> : <AddButtons onCancel={close} />
          }
          defaultValues={event}
        />
      </Modal>

      <EditableSubsection onAdd={open} {...props}>
        {(editing) => (
          <EventsGrid>
            {events.map((event) => (
              <Event
                editing={editing}
                event={event}
                onDelete={onDelete}
                onRequestEdit={onRequestEdit}
                key={event.id}
              />
            ))}
          </EventsGrid>
        )}
      </EditableSubsection>
    </>
  )
}

const Event = ({ event, editing, onRequestEdit, onDelete }) => {
  const preDelete = () => onDelete(event)
  const preRequestEdit = () => onRequestEdit(event)

  return (
    <ControlsWrapper
      visible={editing}
      controls={
        <>
          <Control variant="outline" icon="pen" onClick={preRequestEdit} />
          <Control variant="dangerOutline" icon="trash" onClick={preDelete} />
        </>
      }
    >
      <EventCard event={event} dateClassName={styles.dateTitle} noneShadow={true} />
    </ControlsWrapper>
  )
}

const Control = (props) => {
  return <IconButton className={styles.control} {...props} />
}

const AddButtons = ({ onCancel }) => (
  <>
    <ActionButton icon="plus" type="submit">
      Добавить
    </ActionButton>
    <ActionButton icon="cross" variant="secondary" type="button" onClick={onCancel}>
      Отменить
    </ActionButton>
  </>
)

const EditButtons = ({ onCancel }) => (
  <>
    <ActionButton icon="checkmark" type="submit">
      Сохранить
    </ActionButton>
    <ActionButton icon="cross" variant="secondary" type="button" onClick={onCancel}>
      Отменить
    </ActionButton>
  </>
)

export default EventsControl
