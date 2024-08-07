import { useRef } from "react"

import ActionButton from "components/ui/ActionButton"
import Card from "components/ui/Card"
import EditableSubsection from "components/partials/EditableSubsection"
import ControlsWrapper from "components/ui/ControlsWrapper"
import AccountForm from "components/forms/AccountForm"

import useModal from "hooks/use-modal"

import styles from "./accounts-control.module.scss"

const AccountsControl = ({ accounts, onAdd, onDelete, onEdit, ...props }) => {
  const { Modal, open, close } = useModal()

  const onSubmit = async (data) => {
    const result = await onAdd(data)
    if (result === true) close()
  }

  return (
    <>
      <Modal>
        <AccountForm buttons={<ModalButtons onCancel={close} />} onSubmit={onSubmit} />
      </Modal>

      <EditableSubsection onAdd={open} {...props}>
        {(editing) => (
          <div className={styles.grid}>
            {accounts.map((account) => (
              <Account
                key={account.id}
                account={account}
                onDelete={onDelete}
                editing={editing}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </EditableSubsection>
    </>
  )
}

const Account = ({ account, editing, onDelete, onEdit }) => {
  const ref = useRef()

  const preDelete = () => onDelete(account)
  const preEdit = () => onEdit(ref.current.getValues())

  return (
    <ControlsWrapper
      visible={editing}
      controls={<Controls onEdit={preEdit} onDelete={preDelete} />}
    >
      <Card>
        <AccountForm
          onSubmit={preEdit}
          defaultValues={account}
          disabled={!editing}
          ref={ref}
        />
      </Card>
    </ControlsWrapper>
  )
}

const Controls = ({ onEdit, onDelete }) => (
  <>
    <ActionButton variant="outline" icon="checkmark" onClick={onEdit}>
      Сохранить
    </ActionButton>
    <ActionButton variant="danger" icon="trash" onClick={onDelete}>
      Удалить
    </ActionButton>
  </>
)

const ModalButtons = ({ onCancel }) => (
  <>
    <ActionButton icon="plus" type="submit">
      Добавить
    </ActionButton>
    <ActionButton icon="cross" variant="secondary" onClick={onCancel}>
      Отменить
    </ActionButton>
  </>
)

export default AccountsControl
