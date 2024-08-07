import { useMemo } from "react"

import Subsection from "components/ui/Subsection"
import FileUploadContainer from "components/containers/FileUploadContainer"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import styles from "../applications.module.scss"

const Documents = () => {
  const { data: entrant } = useDefinedQuery(keys.account.entrant)

  const hasDocuments = useMemo(() => {
    return entrant?.snils_image_link || entrant?.passport_info?.image_link
  }, [entrant])

  if (!hasDocuments) return null

  return (
    <Subsection title="Мои Документы" contentClassName={styles.docsGrid}>
      {entrant.snils_image_link && (
        <FileUploadContainer
          readOnly
          className={styles.doc}
          value={entrant.snils_image_link}
        />
      )}

      {entrant.passport_info?.image_link && (
        <FileUploadContainer
          readOnly
          className={styles.doc}
          value={entrant.passport_info.image_link}
        />
      )}
    </Subsection>
  )
}

export default Documents
