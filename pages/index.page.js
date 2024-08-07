import Layout from "components/partials/Layout"
import SearchSection from "components/partials/SearchSection"
import IntroSection from "components/partials/IntroSection"
import InfoSection from "components/partials/InfoSection"
import ApplySection from "components/partials/ApplySection"
import Footer from "components/partials/Footer"
import OverlappingCards from "components/ui/OverlappingCards"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import styles from "./index.module.scss"

const IndexPage = () => (
  <OverlappingCards threshold={0.5}>
    <OverlappingCards.Card className={styles.searchSectionCard}>
      <Layout flatHeader />
      <SearchSection className={styles.searchSection} />
    </OverlappingCards.Card>
    <OverlappingCards.Card className={styles.stacking}>
      <IntroSection />
    </OverlappingCards.Card>
    <OverlappingCards.Card className={styles.stacking}>
      <InfoSection className={styles.info} />
    </OverlappingCards.Card>
    <OverlappingCards.Card className={styles.stacking}>
      <ApplySection />
      <Footer />
    </OverlappingCards.Card>
  </OverlappingCards>
)

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index.page", "header"])),
    },
  }
}

export default IndexPage