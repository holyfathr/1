import Link from "next/link"

import IconLabel from "components/ui/IconLabel"

const HeaderLinks = ({ program }) => (
  <>
    {program.link_to_individual_achievements && (
      <IconLabel icon="globe" variant="rounded">
        <Link href={program.link_to_individual_achievements}>
          Список индивидуальных достижений
        </Link>
      </IconLabel>
    )}
  </>
)

export default HeaderLinks
