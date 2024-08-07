import Breadcrumbs from "components/ui/Breadcrumbs"
import Tooltip from "components/proxies/Tooltip"
import Link from "components/ui/Link"

const ProgramBreadcrumbs = ({ program, ...props }) => (
  <Breadcrumbs {...props}>
    {program.faculty_obj?.city && (
      <Breadcrumbs.Item>
        <Link href={`/search/?faculty_city=${program.faculty_obj.city}`}>
          {program.faculty_obj.city}
        </Link>
      </Breadcrumbs.Item>
    )}

    {program.university_obj?.abbreviation && (
      <Tooltip
        content={program.university_obj.title}
        disabled={!program.university_obj.title}
      >
        <Breadcrumbs.Item>
          <Link href={`/universities/${program.university_obj.id}/`}>
            {program.university_obj.abbreviation}
          </Link>
        </Breadcrumbs.Item>
      </Tooltip>
    )}

    {program.faculty_obj?.abbreviation && (
      <Tooltip content={program.faculty_obj.title} disabled={!program.faculty_obj.title}>
        <Breadcrumbs.Item>
          <Link href={`/faculties/${program.faculty_obj.id}/`}>
            {program.faculty_obj.abbreviation}
          </Link>
        </Breadcrumbs.Item>
      </Tooltip>
    )}
  </Breadcrumbs>
)

export default ProgramBreadcrumbs
