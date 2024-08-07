import ActionButton from "components/ui/ActionButton"
import Toggle from "components/ui/Toggle"

import styles from "./card-controls.module.scss"

const CardControls = ({ visible, onEdit, onDelete, onVisibleToggle }) => {
  return (
    <div className={styles.controls}>
      <Toggle onChange={onVisibleToggle} checked={visible}>
        Отображать на странице сайта
      </Toggle>
      <div className={styles.buttons}>
        <ActionButton variant="outline" icon="pen" onClick={onEdit}>
          Редактировать
        </ActionButton>
        <ActionButton variant="dangerOutline" icon="trash" onClick={onDelete}>
          Удалить
        </ActionButton>
      </div>
    </div>
  )
}

export default CardControls
