import Link from "components/ui/Link"
import Subsection from "components/ui/Subsection"

const Faculty = ({ application }) => (
  <Subsection title={application.faculty_obj.title}>
    <Link href={application.faculty_contact_obj.site_link} variant="accent">
      {application.faculty_contact_obj.site_link}
    </Link>
  </Subsection>
)

export default Faculty
