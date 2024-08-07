import { forwardRef, useCallback, useEffect, useMemo, useState } from "react"
import castArray from "lodash/castArray"
import groupBy from "lodash/groupBy"
import get from "lodash/get"

import Checkbox from "components/ui/Checkbox"
import Dropdown from "components/ui/Dropdown"
import Spoiler from "components/ui/Spoiler"

import styles from "./select.module.scss"

const Select = (
  {
    placeholder: initialPlaceholder,
    dynamicPlaceholder = true,
    value,
    options = [],
    multiple = false,
    valueKey = "value",
    labelKey = "label",
    groupKey,
    onChange,
    ...props
  },
  ref
) => {
  const [selectedValues, setSelectedValues] = useState([])

  const isSelected = (value) => selectedValues.includes(value)

  const findOption = useCallback(
    (value) => options.find((option) => option[valueKey] == value),
    [options, valueKey]
  )

  const onSelect = (option) => {
    const value = option[valueKey]

    let newSelectedValues
    if (isSelected(value)) {
      newSelectedValues = selectedValues.filter((v) => v !== value)
    } else {
      newSelectedValues = multiple ? [...selectedValues, value] : [value]
    }

    setSelectedValues(newSelectedValues)
    onChange && onChange(multiple ? newSelectedValues : newSelectedValues[0])
  }

  const placeholder = useMemo(() => {
    if (!dynamicPlaceholder) return initialPlaceholder

    const selectedLabels = selectedValues
      .map((value) => get(findOption(value), labelKey))
      .filter(Boolean)

    return selectedLabels.join(", ") || initialPlaceholder
  }, [selectedValues, initialPlaceholder, labelKey, findOption, dynamicPlaceholder])

  useEffect(() => {
    setSelectedValues(value ? castArray(value) : [])
  }, [value])

  const renderOption = (option) => (
    <Checkbox
      key={option[valueKey]}
      value={option[valueKey]}
      onChange={() => onSelect(option)}
      checked={isSelected(option[valueKey])}
      disabled={option.disabled}
    >
      {option[labelKey]}
    </Checkbox>
  )

  const grouped = useMemo(() => {
    return groupKey ? groupBy(options, groupKey) : undefined
  }, [groupKey, options])

  return (
    <Dropdown placeholder={placeholder} {...props} ref={ref}>
      {grouped
        ? Object.entries(grouped).map(([category, options]) => (
            <Spoiler title={category} key={category} contentInnerClassName={styles.list}>
              {options.map(renderOption)}
            </Spoiler>
          ))
        : options.map(renderOption)}
    </Dropdown>
  )
}

export default forwardRef(Select)
