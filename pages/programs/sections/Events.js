import Subsection from "components/ui/Subsection"
import EventsGrid from "components/partials/EventsGrid"
import EventCard from "components/ui/EventCard"

const Events = ({ program }) => (
  <Subsection title="День открытых дверей">
    <EventsGrid>
      {program.open_days.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </EventsGrid>
  </Subsection>
)

export default Events
