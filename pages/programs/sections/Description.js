import Content from "components/ui/Content"

import styles from "./description.module.scss"

const Description = ({ program }) => (
  <Content className={styles.description}>{program.full_description}</Content>
)

export default Description
