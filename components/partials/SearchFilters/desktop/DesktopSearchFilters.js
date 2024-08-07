import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "next-i18next"

import Dropdown from "components/ui/Dropdown"
import RangeInput from "components/ui/RangeInput"
import Select from "components/ui/Select"

import styles from "./desktop-search-filters.module.scss"

const DesktopSearchFilters = ({ filters }) => {
  const { t } = useTranslation("search")
  const { t:tC } = useTranslation("common")
  const { control } = useFormContext()

  return (
    <div className={styles.filters}>
      
      <Filter
        options={filters.level_of_education.options || []}
        placeholder={t(`${filters.level_of_education.i18nLabel}`)}
        name="filters.level_of_education"
        multiple
        dynamicPlaceholder={false}
      />

      <Filter
        options={filters.discipline_code.options || []}
        placeholder={t(`${filters.discipline_code.i18nLabel}`)}
        name="filters.discipline_code"
        groupKey="category"
        multiple
        dynamicPlaceholder={false}
      />

      <Filter
        options={filters.languages_of_education.options || []}
        placeholder={t(`${filters.languages_of_education.i18nLabel}`)}
        name="filters.languages_of_education"
        multiple
        dynamicPlaceholder={false}
      />

      <Filter
        options={filters.form_of_education.options || []}
        placeholder={t(`${filters.form_of_education.i18nLabel}`)}
        name="filters.form_of_education"
        multiple
        dynamicPlaceholder={false}
        />

      <Filter
        options={filters.faculty_city.options || []}
        placeholder={t(`${filters.faculty_city.i18nLabel}`)}
        name="filters.faculty_city"
        multiple
        dynamicPlaceholder={false}
      />

      <Dropdown
        placeholder={t(`${filters.commerce_cost.i18nLabel}`)}
        icon="rouble"
        iconFlippable={false}
      >
        <RangeInput>
          <Controller
            name="filters.commerce_cost__gte"
            control={control}
            render={({ field }) => (
              <RangeInput.Input placeholder={tC("from")} {...field} />
            )}
          />
          <Controller
            name="filters.commerce_cost__lt"
            control={control}
            render={({ field }) => <RangeInput.Input placeholder={tC("to")} {...field} />}
          />
        </RangeInput>
      </Dropdown>

      <Filter
        options={filters.extended.options || []}
        placeholder={t(`${filters.extended.i18nLabel}`)}
        name="filters.extended"
        multiple
        dynamicPlaceholder={false}
      />

      <Filter
        options={filters.ordering.options || []}
        placeholder={t(`${filters.ordering.i18nLabel}`)}
        icon="bar-chart"
        iconFlippable={false}
        name="filters.ordering"
      />

    </div>
  )
}

const Filter = ({ name, ...props }) => {
  const { t } = useTranslation("search")
  const { control } = useFormContext()

  const mapFilterProps = (props) => {
    return {
      ...props,
      options: props.options?.map((option) => ({
        ...option,
        value: option.value,
        label: Array.isArray(option)
          ? mapFilterProps(option)
          : option.i18nLabel
          ? t(option.i18nLabel)
          : option.label,
      })),
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Select {...field} {...mapFilterProps(props)} />}
    />
  )
}

export default DesktopSearchFilters
