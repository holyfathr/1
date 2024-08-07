import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"

import AccountsControl from "components/partials/AccountsControl"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import errorHandler from "helpers/error-handler"

import { createUniversity, deleteUniversity, editUniversity } from "api/university"

const UniversitiesControlContainer = () => {
  const queryClient = useQueryClient()

  const createMutation = useMutation(createUniversity, { onError: errorHandler })
  const editMutation = useMutation(editUniversity, { onError: errorHandler })
  const deleteMutation = useMutation(deleteUniversity, { onError: errorHandler })

  const { data: universities = [] } = useDefinedQuery(keys.account.admin.universities)

  const updateUniversitiesQueries = async () => {
    await queryClient.invalidateQueries({
      predicate: ({ queryKey }) => queryKey.includes("university"),
    })
  }

  const onAdd = async (data) => {
    const alert = toast.loading("Добавление университета...")

    try {
      await createMutation.mutateAsync(data)
      await updateUniversitiesQueries()

      toast.success("Университет успешно добавлен", { id: alert })
      return true
    } catch {
      toast.dismiss(alert)
    }

    return false
  }

  const onEdit = async (university) => {
    const alert = toast.loading("Сохранение университета...")

    try {
      await editMutation.mutateAsync(university)
      await updateUniversitiesQueries()

      toast.success("Университет успешно сохранён", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  const onDelete = async (university) => {
    const alert = toast.loading("Удаление университета...")

    try {
      await deleteMutation.mutateAsync(university)
      await updateUniversitiesQueries()

      toast.success("Университет успешно удалён", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  return (
    <AccountsControl
      title="Вузы"
      accounts={universities}
      onAdd={onAdd}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  )
}

export default UniversitiesControlContainer
