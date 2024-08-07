import Row from "components/ui/Row"
import Subsection from "components/ui/Subsection"

import styles from "./application-review.module.scss"

const Priority = ({ application }) => {

  return(
    <Subsection title="Приоритет вузов">
      <Row>
        <div className={application.priority == 1 ? styles.accentPriority : styles.priority}>
          <h4>1</h4>
          <span>Вуз 1</span>
        </div>
        <div className={application.priority == 2 ? styles.accentPriority : styles.priority}>
          <h4>2</h4>
          <span>Вуз 2</span>
        </div>
        <div className={application.priority == 3 ? styles.accentPriority : styles.priority}>
          <h4>3</h4>
          <span>Вуз 3</span>
        </div>
        <div className={application.priority == 4 ? styles.accentPriority : styles.priority}>
          <h4>4</h4>
          <span>Вуз 4</span>
        </div>
        <div className={application.priority == 5 ? styles.accentPriority : styles.priority}>
          <h4>5</h4>
          <span>Вуз 5</span>
        </div>
      </Row>
    </Subsection>
  )
}

export default Priority