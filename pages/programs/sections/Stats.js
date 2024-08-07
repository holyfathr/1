import StatCard from "components/ui/StatCard"

import { getFormOfEducationTitle, getLevelOfEducationDegreeTitle } from "helpers/enums"
import { getProgramLanguage } from "helpers/enums"
import { formatPrice } from "helpers/language"

import styles from "./stats.module.scss"
import Column from "components/ui/Column"
import Divider from "components/ui/Divider"

const Stats = ({ program }) => (
  <div className={styles.stats}>
    <Column>
      {program.level_of_education && (
        <StatCard icon="uni-hat" title={"Уровень образования"} value={getLevelOfEducationDegreeTitle(program.level_of_education)} />
      )}

      {program.form_of_education && (
        <StatCard icon="users" title={"Форма обучения"} value={getFormOfEducationTitle(program.form_of_education)} />
      )}
    </Column>

    <Divider orientation="vertical"/>

    <Column>
      {program.duration && (
        <StatCard icon="clock" title={"Срок обучения"} value={program.duration} />
      )}

      {Number.isFinite(program.commerce_cost) && (
        <StatCard icon="rouble" title={"Стоимость обучения"} value={formatPrice(program.commerce_cost)} />
      )}
    </Column>

    <Divider orientation="vertical"/>

    <Column>
      <StatCard icon="volume2" title={"Язык(и) обучения"} value={getProgramLanguage(program.languages)} />
    </Column>

    <Divider orientation="vertical"/>

    <Column>
      {program.university_obj.has_visa_support && (
        <StatCard icon="document" title={"Виза"}/>
      )}
      {program.university_obj.is_dormitory_available && (
        <StatCard icon="home" title={"Общежитие"} />
      )}
      {program.university_obj.has_migration_support && (
        <StatCard icon="message-circle" title={"Миграционное сопровождение"} />
      )}
    </Column>
  </div>
)

export default Stats
