import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "next-i18next"

import Button from "components/ui/Button"
import Checkbox from "components/ui/Checkbox"
import ContentSidePanel from "components/ui/ContentSidePanel"
import RangeInput from "components/ui/RangeInput"

import styles from "./filter-panel.module.scss"

const FilterPanel = ({ filter, ...props }) => {
  const { t } = useTranslation("search")

  return (
    <Panel name={t(filter?.i18nLabel)} {...props}>
      {filter?.type === "select" && <SelectContent filter={filter} />}
      {filter?.type === "range" && <RangeContent filter={filter} />}
    </Panel>
  )
}

const SelectContent = ({ filter }) => {
  const { t } = useTranslation("search")

  const { register } = useFormContext()

  return filter.options.map((option) => (
    <Checkbox
      key={option.value}
      value={option.value}
      {...register(`filters.${filter.key}`)}
    >
      {option.i18nLabel ? t(option.i18nLabel) : option.label}
    </Checkbox>
  ))
}

const RangeContent = ({ filter }) => {
  const { control } = useFormContext()

  return (
    <RangeInput>
      <Controller
        name={`filters.${filter.key}__gte`}
        control={control}
        render={({ field }) => <RangeInput.Input placeholder="От" {...field} />}
      />
      <Controller
        name={`filters.${filter.key}__lt`}
        control={control}
        render={({ field }) => <RangeInput.Input placeholder="До" {...field} />}
      />
    </RangeInput>
  )
}

const Panel = ({ name, visible, onRequestClose, children }) => {
  const { t: tC } = useTranslation("common")

  return (
    <ContentSidePanel visible={visible} onRequestClose={onRequestClose}>
      <ContentSidePanel.Header>
        <ContentSidePanel.Header.Button icon="arrow-left" onClick={onRequestClose} />
        <ContentSidePanel.Header.Title>{name}</ContentSidePanel.Header.Title>
      </ContentSidePanel.Header>

      <ContentSidePanel.Content className={styles.content}>
        {children}
      </ContentSidePanel.Content>

      <ContentSidePanel.Footer>
        <Button onClick={onRequestClose} className={styles.button}>
          {tC("apply")}
        </Button>
      </ContentSidePanel.Footer>
    </ContentSidePanel>
  )
}

export default FilterPanel
