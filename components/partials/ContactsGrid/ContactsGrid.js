import clsx from "clsx"

import IconLabel from "components/ui/IconLabel"

import {
  hasValidAddress,
  hasValidEmail,
  hasValidPhoneNumber,
  hasValidSiteLink,
  hasTelegram,
} from "helpers/contacts"

import styles from "./contacts-grid.module.scss"
import Icon from "components/ui/Icon"

const ContactsGrid = ({ contacts, className, ...props }) => {
  className = clsx(styles.grid, className)

  return (
    <div>
      <div className={className} {...props}>
        {hasValidSiteLink(contacts) && (
          <IconLabel icon="globe" contentClassName={styles.url}>
            <a className={styles.url}  href={contacts.site_link} target="_blank" rel="noopener noreferrer">
              {contacts.site_link}
            </a>
          </IconLabel>
        )}
        
        {hasValidEmail(contacts) && (
          <IconLabel icon="letter" contentClassName={styles.url}>
            <a className={styles.url}  href={`mailto:${contacts.email}`}>{contacts.email}</a>
          </IconLabel>
        )}

        {hasValidPhoneNumber(contacts) && (
          <IconLabel icon="phone" contentClassName={styles.url}>
            <a className={styles.url}  href={`tel:${contacts.phone_number.replace(/\D/g, "")}`}>
              {contacts.phone_number}
            </a>
          </IconLabel>
        )}

        {hasValidAddress(contacts) && (
          <IconLabel icon="pin" contentClassName={styles.url}>
            <a 
              className={styles.url} 
              href={`https://yandex.ru/maps/?text=${contacts.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contacts.address}
            </a>
          </IconLabel>
        )}
      </div>

      <div className={className}>
        <span className={styles.contactUs}>Свяжись с вузом в соцсетях</span>

        {hasTelegram(contacts) && (
            <a className={styles.url}  href={contacts.telegram}>
              <Icon slug="telegram"/>
            </a>
        )}
      </div>
    </div>
  )
}

export default ContactsGrid
