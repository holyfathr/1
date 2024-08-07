import ContactsGrid from "components/partials/ContactsGrid"
import Subsection from "components/ui/Subsection"

const Contacts = ({ application }) => (
  <Subsection title="Контакты вуза">
    <ContactsGrid contacts={application.university_contact_obj} />
  </Subsection>
)

export default Contacts
