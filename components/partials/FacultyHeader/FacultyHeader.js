import Image from "next/image"
import clsx from "clsx"

import ActionButton from "components/ui/ActionButton"

import styles from "./faculty-header.module.scss"

const FacultyHeader = ({ faculty, className, ...props }) => {
  className = clsx(styles.header, className)

  return (
    <div className={className} {...props}>
      {faculty.logo_link && (
        <div className={styles.logo}>
          <Image
            src={faculty.logo_link}
            layout="fill"
            alt=""
            objectFit="contain"
            priority
          />
        </div>
      )}

      <div className={styles.info}>
        <h2 className={styles.title}>{faculty.title}</h2>

        <ActionButton
          variant="outline"
          icon="arrow-right"
          href="#programs"
          className={styles.button}
        >
          Программы факультета
        </ActionButton>
      </div>
    </div>
  )
}

export default FacultyHeader
