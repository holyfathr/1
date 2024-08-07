import ContactsGrid from "components/partials/ContactsGrid"
import Subsection from "components/ui/Subsection"

const Contacts = ({ university }) => (
  <Subsection title="Контакты">
    <ContactsGrid contacts={university.contact_obj} />
  </Subsection>
)

export default Contacts
