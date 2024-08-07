import Link from "next/link"

import IconLabel from "components/ui/IconLabel"

const Links = ({ program }) => (
  <>
    {program.link_to_university_info && (
      <IconLabel icon="globe" variant="rounded">
        <Link href={program.link_to_university_info}>WEB сайт программы</Link>
      </IconLabel>
    )}
  </>
)

export default Links
