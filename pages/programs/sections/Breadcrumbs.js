import BreadcrumbsComponent from "components/ui/Breadcrumbs"
import Link from "components/ui/Link"

const Breadcrumbs = ({ program, underline }) => (
  <BreadcrumbsComponent underline={underline}>
    <BreadcrumbsComponent.Item>
      <Link href="/search/">Поиск</Link>
    </BreadcrumbsComponent.Item>

    {program?.faculty_obj?.city && (
      <BreadcrumbsComponent.Item>
        <Link href={`/search/?faculty_city=${program.faculty_obj.city}`}>
          {program.faculty_obj.city}
        </Link>
      </BreadcrumbsComponent.Item>
    )}

    {program?.university_obj?.abbreviation && (
      <BreadcrumbsComponent.Item>
        <Link href={`/universities/${program.university_obj.id}/`}>
          {program.university_obj.abbreviation}
        </Link>
      </BreadcrumbsComponent.Item>
    )}

    {program.faculty_obj?.abbreviation && (
      <BreadcrumbsComponent.Item>
        <Link href={`/faculties/${program.faculty_obj.id}/`}>
          {program.faculty_obj.abbreviation}
        </Link>
      </BreadcrumbsComponent.Item>
    )}

    {program?.title && (
      <BreadcrumbsComponent.Item>
        <Link href={`/programs/${program.id}/`}>
          {program.title}
        </Link>
      </BreadcrumbsComponent.Item>
    )}
  </BreadcrumbsComponent>
)

export default Breadcrumbs
