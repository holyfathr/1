import map from "lodash/map"

import FeatureCard from "components/ui/FeatureCard"

import styles from "./features.module.scss"

const Features = ({ program }) => (
  <div className={styles.features}>
    {program.duration && (
      <FeatureCard>
        <FeatureCard.Header>Период обучения</FeatureCard.Header>
        <FeatureCard.Content>{program.duration}</FeatureCard.Content>
      </FeatureCard>
    )}

    {program.languages.length > 0 && (
      <FeatureCard>
        <FeatureCard.Header>Язык обучения</FeatureCard.Header>
        <FeatureCard.Content>
          {map(program.languages, "russian_title").join(", ")}
        </FeatureCard.Content>
      </FeatureCard>
    )}

    {program.has_military_department && (
      <FeatureCard>
        <FeatureCard.Header>Есть</FeatureCard.Header>
        <FeatureCard.Content>Военная кафедра</FeatureCard.Content>
      </FeatureCard>
    )}

    {program.has_gov_accreditation && (
      <FeatureCard>
        <FeatureCard.Header>Есть</FeatureCard.Header>
        <FeatureCard.Content>Государственная аккредитация</FeatureCard.Content>
      </FeatureCard>
    )}
  </div>
)

export default Features
