import {getQualifyTestType} from "helpers/enums"
import useDefinedQuery, { keys } from "hooks/use-defined-query"


import Label from "components/ui/Label"

import styles from "./qualify-test.module.scss"

const QualifyTest = ({ program }) => {
  const {data: dvi, isLoading: isDviLoading } = useDefinedQuery(keys.program(program.id).dvi)

  console.log(dvi)

 if(isDviLoading) return <p>Загрузка...</p>

  if (program?.dvi[0]) 

  return (
    <div className={styles.qualifyingTest}>
      <Label title="Вступительное испытание">
        <p className={styles.label}>{getQualifyTestType(program.dvi[0].type)}</p>
      </Label>
      { program.dvi[0].type == "I" && <div className={styles.description}>{program.dvi[0].description}</div>}
      { program.dvi[0].type == "P" && <div className={styles.description}>{program.dvi[0].description}</div> }
      { program.dvi[0].type == "T" && (
        <div className={styles.tests}>
          {program.dvi[0].exams.map((exam) => ( <div key={exam.id} className={styles.test}> {exam.exam_title} </div> ))}
        </div>
      )}
    </div>
  )
}

export default QualifyTest
