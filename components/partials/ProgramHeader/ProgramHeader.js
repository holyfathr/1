import clsx from "clsx"
import Image from "next/image"

import ActionButton from "components/ui/ActionButton"

import styles from "./program-header.module.scss"

const ProgramHeader = ({ program, className, ...props }) => {
  className = clsx(styles.header, className)

  return (
    <div className={className} {...props}>
      {program.university_obj?.logo_link && (
        <div className={styles.logo}>
          <Image
            src={program.university_obj.logo_link}
            layout="fill"
            alt=""
            objectFit="contain"
            priority
          />
        </div>
      )}

      <div className={styles.content}>
        <h1 className={styles.title}>{program.title}</h1>

        {program.discipline_code && (
          <p className={styles.subtitle}>{program.discipline_code}</p>
        )}

        {program.university_obj.abbreviation && (
          <ActionButton
            variant="outline"
            icon="arrow-right"
            href={`/search/?search=${program.university_obj.abbreviation}`}
            className={styles.button}
          >
            Другие программы вуза
          </ActionButton>
        )}
      </div>
    </div>
  )
}

export default ProgramHeader
