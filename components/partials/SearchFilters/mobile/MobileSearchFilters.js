import { useMemo, useState } from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import omit from "lodash/omit"
import isEqual from "lodash/isEqual"
import { useTranslation } from "next-i18next"

import Dropdown from "components/ui/Dropdown"
import Select from "components/ui/Select"
import FiltersPanel from "./sections/FiltersPanel"
import FilterPanel from "./sections/FilterPanel"

import styles from "./mobile-search-filters.module.scss"

const MobileSearchFilters = ({ filters }) => {
  const { t } = useTranslation("search")
  
  const [filtersPanelVisible, setFiltersPanelVisible] = useState(false)
  const openFiltersPanel = () => setFiltersPanelVisible(true)
  const closeFiltersPanel = () => setFiltersPanelVisible(false)

  const [selectedFilter, setSelectedFilter] = useState(null)
  const closeFilterPanel = () => setSelectedFilter(null)

  const { control, defaultValues, reset } = useFormContext()
  const values = useWatch({ control })

  const onReset = () => reset(omit(defaultValues, "ordering"))

  const hasActiveFilters = useMemo(() => {
    if (values.search !== defaultValues.search) return true

    return Object.entries(values.filters).some(([key, value]) => {
      if (key === "ordering") return false
      return !isEqual(value, defaultValues.filters[key])
    })
  }, [defaultValues, values])

  return (
    <>
      <div className={styles.filters}>
        <Filter
          options={filters.ordering.options || []}
          placeholder={t(`${filters.ordering.i18nLabel}`)}
          icon="filter"
          iconFlippable={false}
          name="filters.ordering"
          dynamicPlaceholder
        />
        <Dropdown
          placeholder={t(`filters.label`)}
          icon="sliders"
          variant="simple"
          className={hasActiveFilters ? styles.active : undefined}
          onClick={openFiltersPanel}
        />
      </div>

      <FiltersPanel
        visible={filtersPanelVisible}
        onRequestClose={closeFiltersPanel}
        onSelect={setSelectedFilter}
        filters={omit(filters, "ordering")}
        onReset={hasActiveFilters ? onReset : undefined}
      />

      <FilterPanel
        visible={!!selectedFilter}
        onRequestClose={closeFilterPanel}
        filter={selectedFilter}
      />
    </>
  )
}

const Filter = ({ name, ...props }) => {
  const { t } = useTranslation("search")
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select variant="simple" {...field} {...mapFilterProps(props)} />
      )}    />
  )
}

export default MobileSearchFilters
