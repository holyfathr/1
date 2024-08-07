import FeatureCard from "components/ui/FeatureCard"
import Position from "components/ui/Position"

import { getTrainingFormTitle } from "helpers/enums"

import styles from "../applications.module.scss"

const Features = ({ application }) => (
  <div className={styles.features}>
    {application.has_agreement ? (
      <FeatureCard>
        <div className={styles.success}>Согласие подано</div>
      </FeatureCard>
    ) : (
      <FeatureCard>
        <div className={styles.danger}>Согласие не подано</div>
      </FeatureCard>
    )}

    <FeatureCard>
      <div className={styles.danger}>Заявление не принято</div>
    </FeatureCard>

    <FeatureCard>
      <Position date={application.update_date}>{application.position || "N/A"}</Position>
    </FeatureCard>

    <FeatureCard>
      <FeatureCard.Content>
        {getTrainingFormTitle(application.training_form)}
      </FeatureCard.Content>
    </FeatureCard>
  </div>
)

export default Features
