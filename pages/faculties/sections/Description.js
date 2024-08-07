import Content from "components/ui/Content"
import Subsection from "components/ui/Subsection"

const Description = ({ faculty }) => (
  <Subsection title="О факультете">
    <Content>{faculty.full_description}</Content>
  </Subsection>
)

export default Description
