import clsx from "clsx"

import Button from "components/ui/Button"

import styles from "./applications-export-buttons.module.scss"

const ApplicationsExportButtons = ({ onExport, className, ...props }) => {
  className = clsx(styles.export, className)

  return (
    <div className={className} {...props}>
      <span>Экспорт в</span>
      <ExportButton onClick={() => onExport("xlsx")}>XLSX</ExportButton>
      <ExportButton onClick={() => onExport("csv")}>CSV</ExportButton>
    </div>
  )
}

const ExportButton = ({ children, ...props }) => (
  <Button tiny variant="outline" {...props}>
    {children}
  </Button>
) 

export default ApplicationsExportButtons
