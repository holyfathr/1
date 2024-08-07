import { useForm } from "react-hook-form"
import clsx from "clsx"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import HeroSection from "components/partials/HeroSection"
import Wrapper from "components/ui/Wrapper"
import Typewriter from "components/ui/Typewriter"
import SearchBar from "components/ui/SearchBar"

import styles from "./search-section.module.scss"

const SearchSection = ({ className, ...props }) => {
  const { t } = useTranslation("index.page")
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  const onSubmit = ({ search }) => {
    router.push({ pathname: "/search/", query: { search } })
  }

  className = clsx(styles.section, className)

  return (
    <HeroSection className={className} {...props}>
      <Wrapper className={styles.wrapper}>
        <Typewriter
          as="h1"
          className={styles.title}
          options={{ loop: true, pauseFor: 5000 }}
        >
          {t("searchSection.tagline")}
        </Typewriter>

        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchBar
            variant="borderless"
            className={styles.search}
            placeholder={t("searchSection.searchBarPlaceholder")}
            {...register("search")}
          />
        </form>
      </Wrapper>
    </HeroSection>
  )
}

export default SearchSection
