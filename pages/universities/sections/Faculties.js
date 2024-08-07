import FacultyCard from "components/ui/FacultyCard"
import Subsection from "components/ui/Subsection"

import styles from "../universities.module.scss"

const Faculties = ({ university }) => (
  <Subsection title="Факультеты" contentClassName={styles.faculties}>
    {university.faculties.map((faculty) => (
      <FacultyCard faculty={faculty} key={faculty.id} />
    ))}
  </Subsection>
)

export default Faculties
