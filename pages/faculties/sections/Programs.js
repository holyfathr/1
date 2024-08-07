import ProgramsGrid from "components/partials/ProgramsGrid"
import ProgramCard from "components/ui/ProgramCard"
import Subsection from "components/ui/Subsection"

const Programs = ({ faculty }) => (
  <Subsection title="Образовательные программы" id="programs">
    <ProgramsGrid>
      {faculty.educational_programs.map((program) => (
        <ProgramCard program={program} key={program.id} />
      ))}
    </ProgramsGrid>
  </Subsection>
)

export default Programs
