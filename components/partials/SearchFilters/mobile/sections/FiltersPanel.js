import { useFormContext, useWatch } from "react-hook-form"
import { useTranslation } from "next-i18next"
import isEqual from "lodash/isEqual"

import ActionButton from "components/ui/ActionButton"
import Button from "components/ui/Button"
import ContentSidePanel from "components/ui/ContentSidePanel"
import LinkButton from "components/ui/LinkButton"
import SearchBar from "components/ui/SearchBar"

import styles from "./filters-panel.module.scss"

const FiltersPanel = ({ filters, visible, onRequestClose, onSelect, onReset }) => {
  const { t } = useTranslation("search")
  const { t: tC } = useTranslation("common")

  const { control, register, defaultValues } = useFormContext()
  const values = useWatch({ name: "filters", control })

  const preSelect = ({ target }) => {
    const { key } = target.dataset
    onSelect({ ...filters[key], key })
  }

  const isActive = (key) => {
    if (filters[key]?.type === "range")
      return isActive(key + "__gte") || isActive(key + "__lt")

    return !isEqual(values[key], defaultValues.filters[key])
  }

  return (
    <ContentSidePanel visible={visible} onRequestClose={onRequestClose}>
      <ContentSidePanel.Header>
        <ContentSidePanel.Header.Button icon="cross" onClick={onRequestClose} />
        <ContentSidePanel.Header.Title>{t("filters.label")}</ContentSidePanel.Header.Title>
      </ContentSidePanel.Header>

      <ContentSidePanel.Content className={styles.list}>
        <SearchBar placeholder="Поиск" {...register("search")} />

        {Object.entries(filters).map(([key, filter]) => (
          <Filter onClick={preSelect} data-key={key} key={key} active={isActive(key)}>
            {t(filter.i18nLabel)}
          </Filter>
        ))}
      </ContentSidePanel.Content>

      <ContentSidePanel.Footer className={styles.footer}>
        <Button onClick={onRequestClose}>{tC("apply")}</Button>
        {onReset && <LinkButton onClick={onReset}>{tC("resetAll")}</LinkButton>}
      </ContentSidePanel.Footer>
    </ContentSidePanel>
  )
}

const Filter = ({ active, children, ...props }) => (
  <ActionButton
    icon="arrow-right"
    variant={active ? "outline" : "secondary"}
    className={styles.filter}
    {...props}
  >
    {children}
  </ActionButton>
)

export default FiltersPanel
