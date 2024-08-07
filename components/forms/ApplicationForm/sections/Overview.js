import Page from "components/partials/Page"
import Button from "components/ui/Button"
import ActionButton from "components/ui/ActionButton"
import Checkboxes from "./Agreements/sections/Checkboxes"
import Achievements from "./Information/sections/Achievements"
import Address from "./Information/sections/Address"
import Passport from "./Information/sections/Passport"
import Personal from "./Information/sections/Personal"
import ResultsContainer from "./Information/sections/ResultsContainer"
import Snils from "./Information/sections/Snils"
import List from "./Priorities/sections/List"
import Contacts from "./Information/sections/Contacts"
import Education from "./Information/sections/Education"
import Grades from "./Information/sections/Grades"
import NationalityDetails from "./Information/sections/NationalityDetails"
import Documents from "./Information/sections/Documents"
import Additional from "./Information/sections/Additional"

import useToggle from "hooks/use-toggle"

import styles from "../application-form.module.scss"

const Overview = ({ onPrev, onNext }) => {
  const [overviewEnabled, toggleOverviewEnabled] = useToggle(true)

  return (
    <Page title="Проверь заявку" contentClassName={styles.subsections}>
      <List overview />

      <Page
        title="Заявка"
        contentClassName={styles.subsections}
      >
        <Personal overview={overviewEnabled} />
        {/* <Address overview={overviewEnabled} /> */}
        <Contacts overview={overviewEnabled} />
        <NationalityDetails overview={overviewEnabled}/>
        <Documents overview={overviewEnabled}/>
        <Additional overview={overviewEnabled}/>
        {/* <Snils overview={overviewEnabled} /> */}
        {/* <Passport overview={overviewEnabled} /> */}
        {/* <Education overview={overviewEnabled} /> */}
        {/* <Grades overview={overviewEnabled} /> */}
        {/* <Achievements overview={overviewEnabled} /> */}
        {/* <ResultsContainer overview={overviewEnabled} /> */}
        {/* <Checkboxes overview={overviewEnabled} /> */}

        <div className={styles.buttons}>
          <Button variant="ghost" onClick={onPrev}>
            Назад
          </Button>
          <Button type="submit">Отправить заявку</Button>
        </div>
      </Page>
    </Page>
  )
}

export default Overview
