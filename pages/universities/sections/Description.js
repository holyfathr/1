import Content from "components/ui/Content"
import Subsection from "components/ui/Subsection"

const Description = ({ university }) => (
  <Subsection title="О вузе">
    <Content>{university.full_description}</Content>
  </Subsection>
)

export default Description
