import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"

import AccountsControl from "components/partials/AccountsControl"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import errorHandler from "helpers/error-handler"

import { createFaculty, deleteFaculty, editFaculty } from "api/faculty"

const FacultiesControlContainer = () => {
  const queryClient = useQueryClient()

  const { data: faculties = [] } = useDefinedQuery(keys.account.university.faculties)

  const createMutation = useMutation(createFaculty, { onError: errorHandler })
  const editMutation = useMutation(editFaculty, { onError: errorHandler })
  const deleteMutation = useMutation(deleteFaculty, { onError: errorHandler })

  const updateFacultiesQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey.includes("faculty"),
    })
  }

  const onAdd = async (data) => {
    const alert = toast.loading("Добавление факультета...")

    try {
      await createMutation.mutateAsync(data)
      await updateFacultiesQueries()

      toast.success("Факультет успешно добавлен", { id: alert })
      return true
    } catch {
      toast.dismiss(alert)
    }

    return false
  }

  const onEdit = async (data) => {
    const alert = toast.loading("Сохранение факультета...")

    try {
      await editMutation.mutateAsync(data)
      await updateFacultiesQueries()

      toast.success("Факультет успешно сохранён", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  const onDelete = async (faculty) => {
    const alert = toast.loading("Удаление факультета...")

    try {
      await deleteMutation.mutateAsync(faculty)
      await updateFacultiesQueries()

      toast.success("Факультет успешно удалён", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  return (
    <AccountsControl
      title="Факультеты"
      accounts={faculties}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  )
}

export default FacultiesControlContainer
