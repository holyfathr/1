import ContactsGrid from "components/partials/ContactsGrid"
import Subsection from "components/ui/Subsection"

const Contacts = ({ faculty }) => (
  <Subsection title="Контакты">
    <ContactsGrid contacts={faculty.contact_obj} />
  </Subsection>
)

export default Contacts
