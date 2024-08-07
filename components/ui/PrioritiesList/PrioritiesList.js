import { SortableContainer, SortableElement } from "react-sortable-hoc"
import { arrayMoveImmutable } from "array-move"

import Icon from "components/ui/Icon"

import styles from "./priorities-list.module.scss"

const PrioritiesList = ({ programs, renderCard, onChange, disabled }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newPrograms = arrayMoveImmutable(programs, oldIndex, newIndex)
    onChange(newPrograms)
  }

  return (
    <Container onSortEnd={onSortEnd}>
      {programs.map((program, index) => (
        <Row
          key={`row-${index}`}
          program={program}
          index={index}
          sortIndex={index}
          renderCard={renderCard}
          disabled={disabled}
        />
      ))}
    </Container>
  )
}

const Container = SortableContainer(({ children }) => {
  return <div className={styles.grid}>{children}</div>
})

const Row = SortableElement(({ sortIndex, program, renderCard }) => (
  <div className={styles.row}>
    <div className={styles.controls}>
      <p className={styles.index}>{sortIndex + 1}</p>
      <div className={styles.order}>
        <Icon slug="burger" className={styles.icon} />
      </div>
    </div>

    <div className={styles.cardWrapper}>{renderCard(program)}</div>
  </div>
))

export default PrioritiesList
