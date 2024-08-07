import Link from "components/ui/Link"
import Subsection from "components/ui/Subsection"

const University = ({ application }) => (
  <Subsection title={application.university_obj.abbreviation}>
    <Link href={application.university_contact_obj.site_link} variant="accent">
      {application.university_contact_obj.site_link}
    </Link>
  </Subsection>
)

export default University
