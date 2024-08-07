import ActionButton from "components/ui/ActionButton"
import FullWidthScrollLine from "components/ui/FullWidthScrollLine"

import { useTranslation } from "next-i18next"

import styles from "./desktop-search-options.module.scss"

const DesktopSearchOptions = ({ options, onDelete, onDeleteAll }) => {
  const { t: tC } = useTranslation("common")

  return (
    <FullWidthScrollLine className={styles.options}>
      {options.length > 0 && (
        <ActionButton icon="trash" variant="danger" onClick={onDeleteAll}>
          {tC("resetAll")}
        </ActionButton>
      )}

      {options.map((option) => (
        <ActionButton
          key={option.key + option.value}
          icon="cross"
          variant="outline"
          onClick={() => onDelete(option)}
        >
          {option.label}
        </ActionButton>
      ))}
    </FullWidthScrollLine>
  )
}

export default DesktopSearchOptions
