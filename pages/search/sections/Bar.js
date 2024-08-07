import { useFormContext } from "react-hook-form"
import { useTranslation } from "next-i18next"

import SearchBar from "components/ui/SearchBar"

import useQueryOnce from "hooks/use-query-once"

import styles from "./bar.module.scss"

const Bar = () => {
  const { t: tC } = useTranslation("common")
  const { register, setValue } = useFormContext()

  useQueryOnce({ search: undefined }, ({ search }) => setValue("search", search))

  return (
    <SearchBar
      className={styles.bar}
      placeholder={tC("searchBarPlaceholder")}
      {...register("search")}
    />
  )
}

export default Bar
