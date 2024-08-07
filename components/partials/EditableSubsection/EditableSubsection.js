import Subsection from "components/ui/Subsection"
import ActionButton from "components/ui/ActionButton"

import useToggle from "hooks/use-toggle"

import styles from "./editable-subsection.module.scss"

const EditableSubsection = ({ onAdd, onEdit, children, ...props }) => {
  const [editing, toggleEditing] = useToggle(false)

  const onPreEdit = (event) => {
    toggleEditing()
    onEdit && onEdit(event)
  }

  return (
    <Subsection
      controls={<Controls editing={editing} onEdit={onPreEdit} onAdd={onAdd} />}
      {...props}
    >
      {typeof children === "function" ? children(editing) : children}
    </Subsection>
  )
}

const Controls = ({ editing, onEdit, onAdd }) => (
  <div className={styles.controls}>
    <ActionButton variant="secondary" icon={editing ? "cross" : "pen"} onClick={onEdit}>
      {editing ? "Отменить" : "Редактировать"}
    </ActionButton>

    <ActionButton icon="plus" onClick={onAdd}>
      Добавить
    </ActionButton>
  </div>
)

export default EditableSubsection
