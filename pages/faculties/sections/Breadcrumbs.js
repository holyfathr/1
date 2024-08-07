import BreadcrumbsComponent from "components/ui/Breadcrumbs"
import Link from "components/ui/Link"

import styles from "../faculties.module.scss"

const Breadcrumbs = ({ faculty }) => (
  <BreadcrumbsComponent className={styles.breadcrumbs} underline>
    <BreadcrumbsComponent.Item>
      <Link href="/search/">Поиск</Link>
    </BreadcrumbsComponent.Item>

    {faculty.city && (
      <BreadcrumbsComponent.Item>
        <Link href={`/search/?faculty_city=${faculty.city}`}>{faculty.city}</Link>
      </BreadcrumbsComponent.Item>
    )}

    {faculty.university_obj?.abbreviation && (
      <BreadcrumbsComponent.Item>
        <Link href={`/universities/${faculty.university_obj.id}/`}>
          {faculty.university_obj.abbreviation}
        </Link>
      </BreadcrumbsComponent.Item>
    )}

    {faculty?.abbreviation && (
      <BreadcrumbsComponent.Item>
        <Link href={`/faculties/${faculty.id}/`}>
          {faculty.abbreviation}
        </Link>
      </BreadcrumbsComponent.Item>
    )}
  </BreadcrumbsComponent>
)

export default Breadcrumbs
