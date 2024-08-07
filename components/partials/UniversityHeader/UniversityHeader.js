import clsx from "clsx"
import Image from "next/image"

import ActionButton from "components/ui/ActionButton"
import FullWidth from "components/ui/FullWidth"
import Wrapper from "components/ui/Wrapper"
import Breadcrumbs from "components/ui/Breadcrumbs"
import Link from "components/ui/Link"

import styles from "./university-header.module.scss"
import Row from "components/ui/Row"

const UniversityHeader = ({ university, className, ...props }) => {
  className = clsx(styles.header, className)

  return (
    <FullWidth className={className} {...props}>
      <Wrapper className={styles.wrapper}>
        <Breadcrumbs underline underlineColor="white">
          <Breadcrumbs.Item>
            <Link href="/search/" variant="light">
              Поиск
            </Link>
          </Breadcrumbs.Item>

          {university.city && (
            <Breadcrumbs.Item>
              <Link href={`/search/?search=${university.city}`} variant="light">
                {university.city}
              </Link>
            </Breadcrumbs.Item>
          )}
          {university.abbreviation && (
            <Breadcrumbs.Item>
              <Link href={`/search/?search=${university.abbreviation}`} variant="light">
                {university.abbreviation}
              </Link>
            </Breadcrumbs.Item>
          )}
        </Breadcrumbs>

        <div className={styles.content}>
          {university.logo_link && (
            <div className={styles.logo}>
              <Image
                src={university.logo_link}
                layout="fill"
                alt=""
                objectFit="contain"
                priority
              />
            </div>
          )}

          <div className={styles.info}>
            <div className={styles.tags}>
              {university.is_dormitory_available && (
                <FeatureTag>Общежитие</FeatureTag>
              )}
              {/* {university.has_military_department && (
                <FeatureTag>Военная кафедра</FeatureTag>
              )}
              {university.has_scholarships_and_discounts && (
                <FeatureTag>Есть стипендии и скидки</FeatureTag>
              )} */}
              {university.has_migration_support && (
                <FeatureTag>Миграционное сопровождение</FeatureTag>
              )}
              
              {university.has_visa_support && (
                <FeatureTag>Виза</FeatureTag>
              )}
            </div>

            <h1 className={styles.title}>{university.title}</h1>
            <Row className={styles.buttonsWrapper}>
              {/* <ActionButton
                variant="light"
                icon="arrow-right"
                href={`/search/?search=${university.abbreviation}`}
                className={styles.button}
              >
                Подать заявку
              </ActionButton> */}

              <ActionButton
                variant="light"
                icon="arrow-right"
                href={`/search/?search=${university.abbreviation}`}
                className={styles.button}
              >
                Программы вуза
              </ActionButton>
            </Row>
          </div>
        </div>
      </Wrapper>

      <div
        className={styles.backgroundWrapper}
        style={{ backgroundColor: university.background_color }}
      >
        {university.image_link && (
          <Image
            src={university.image_link}
            layout="fill"
            alt=""
            className={styles.background}
            objectFit="cover"
          />
        )}
      </div>
    </FullWidth>
  )
}

const FeatureTag = ({ children }) => {
  return <div className={styles.tag}>{children}</div>
}

export default UniversityHeader
