import { useState } from "react"
import clsx from "clsx"

import ActionButton from "components/ui/ActionButton"
import ControlsWrapper from "components/ui/ControlsWrapper"
import ProgramCard from "components/ui/ProgramCard"

import styles from "./program-summary-card-pickable.module.scss"

const ProgramSummaryCardPickable = ({ program, className, ...props }) => {

  const [isAdded, setIsAdded] = useState(false)
  
  className = clsx(styles.controls, isAdded && styles.cardIsAdded)

  return(
    <ControlsWrapper
      visible
      controls={<Controls program={program} {...props} isAdded={isAdded} setIsAdded={setIsAdded}/>}
      className={className}
    >
      <ProgramCard program={program} className={styles.card} showFooter={false} isAdded={isAdded}/>
    </ControlsWrapper>
  )
}


const Controls = ({ program, onSelect, onDeselect, isAdded, setIsAdded }) => {
  const [trainingForm, setTrainingForm] = useState("P")

  const preSelect = () => {
    onSelect({...program, training_form: trainingForm})
    setIsAdded(true)
  }
  const preDeselect = () => {
    onDeselect(program)
    setIsAdded(false)
  }

  return (
    <>
      <ActionButton
        variant={isAdded ? "outline" : "accent"}
        icon={isAdded ? "checkmark" : "plus"}
        onClick={preSelect}
      >
        {isAdded ? "Добавлено" : "Добавить"}
      </ActionButton>

      <ActionButton
        variant="dangerOutline"
        icon="trash"
        onClick={preDeselect}
        style={{ visibility: isAdded ? "visible" : "hidden" }}
      >
        Удалить
      </ActionButton>
    </>
  )
}

export default ProgramSummaryCardPickable

