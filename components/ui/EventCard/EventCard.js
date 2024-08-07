import { forwardRef, useMemo } from "react";
import clsx from "clsx";
import Card from "components/ui/Card";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import styles from "./event-card.module.scss";
import Link from "../Link";

const EventCard = ({ event, className, dateClassName, noneShadow, ...props }, ref) => {
  const formattedDate = useMemo(() => {
    return event.date ? format(new Date(event.date), "dd MMMM yyyy 'в' HH:mm", { locale: ru }) : '';
  }, [event]);

  className = clsx(!noneShadow ? styles.card : styles.cardNoneShad, className);

  const dateClass = clsx(styles.date, dateClassName);

  console.log(event)

  return (
    <Card className={className} {...props} ref={ref}>
      <p className={dateClass}>{formattedDate}</p>
      {event.description && <p className={styles.description}>{event.description}</p>}
      {event.virtual_meeting && <Link href={event.virtual_meeting} className={styles.link} variant="accent">Виртуальная встреча</Link>}
    </Card>
  );
};

export default forwardRef(EventCard);
