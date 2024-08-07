import toast from "react-hot-toast"
import { useMutation } from "react-query"

import ApplicationsExportButtons from "components/partials/ApplicationsExportButtons"

import { downloadFacultyApplications } from "api/faculty"

import errorHandler from "helpers/error-handler"

const ApplicationsExportButtonsContainer = ({ programId, ...props }) => {
  const exportMutation = useMutation(downloadFacultyApplications, {
    onError: errorHandler,
  })

  const onExport = async (format) => {
    const alert = toast.loading("Скачивание файла...")

    try {
      await exportMutation.mutateAsync({ programId, format })
      toast.success("Началось скачивание файла", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  return <ApplicationsExportButtons onExport={onExport} {...props} />
}

export default ApplicationsExportButtonsContainer
