import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { useMemo } from "react"

import FacultyProfileForm from "components/forms/FacultyProfileForm"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import { editFacultyAccount } from "api/faculty"
import { editAccountContacts } from "api/account"

import errorHandler from "helpers/error-handler"

const FacultyProfileFormContainer = () => {
  const queryClient = useQueryClient()

  const { data: faculty } = useDefinedQuery(keys.account.faculty)
  const { data: contacts } = useDefinedQuery(keys.account.contacts)

  const editMutation = useMutation(editFacultyAccount, { onError: errorHandler })
  const editContactsMutation = useMutation(editAccountContacts, { onError: errorHandler })

  const onSubmit = async ({ contacts, ...data }) => {
    const alert = toast.loading("Сохранение профиля...")

    console.log(data)
  
    try {
      await editMutation.mutateAsync(data)
      await editContactsMutation.mutateAsync(contacts)
      await queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("account"),
      })

      toast.success("Профиль успешно сохранён", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  const defaultValues = useMemo(() => {
    if (!faculty || !contacts) return undefined
    return { ...faculty, contacts }
  }, [faculty, contacts])

  if (!defaultValues) return "Загрузка..."

  return (
    <FacultyProfileForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      disabled={editMutation.isLoading || editContactsMutation.isLoading}
    />
  )
}

export default FacultyProfileFormContainer
