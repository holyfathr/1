import { useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import without from "lodash/without"

import SearchOptions from "components/partials/SearchOptions"

import useDefinedQuery, { keys } from "hooks/use-defined-query"
import { useTranslation } from "next-i18next"

import { formatPrice } from "helpers/language"

const SearchOptionsContainer = () => {
  const { t } = useTranslation("search")
  const { t: tC } = useTranslation("common")

  const { control, setValue, reset, defaultValues } = useFormContext()
  const values = useWatch({ control, name: "filters" })

  const { data: filters = {} } = useDefinedQuery(keys.searchFilters)

  const onDelete = ({ key, value }) => {
    const newValue = Array.isArray(values[key])
      ? without(values[key], value)
      : defaultValues.filters[key]

    setValue(`filters.${key}`, newValue)
  }

  const onDeleteAll = () => {
    reset(defaultValues)
  }

  const options = useMemo(() => {
    const options = []

    for (const [key, filter] of Object.entries(filters)) {
      if (filter.type === "select" && Array.isArray(values[key])) {
        for (const item of values[key]) {
          const filterOption = filter.options.find((o) => o.value === item)
          options.push({
            label: filterOption.i18nLabel
              ? t(filterOption.i18nLabel)
              : filterOption.label,
            value: item,
            key,
          })
        }
      }

      if (filter.type === "range") {
        if (Number.isFinite(values[key + "__gte"])) {
          const label =
          `${tC("from").toLowerCase()} ` + formatPrice(values[key + "__gte"])
          options.push({ label, value: values[key + "__gte"], key: key + "__gte" })
        }

        if (Number.isFinite(values[key + "__lt"])) {
          const label = `${tC("to").toLowerCase()} ` + formatPrice(values[key + "__lt"])
          options.push({ label, value: values[key + "__lt"], key: key + "__lt" })
        }
      }
    }

    return options
  }, [values, filters, t, tC])

  if (options.length === 0) return null

  return <SearchOptions options={options} onDelete={onDelete} onDeleteAll={onDeleteAll} />
}

export default SearchOptionsContainer
