import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"
import { useMemo } from "react"

import ProfileForm from "components/forms/ProfileForm"

import useDefinedQuery, { keys } from "hooks/use-defined-query"

import errorHandler from "helpers/error-handler"

import { editEntrantAccount } from "api/entrant"

const ProfileFormContainer = (props) => {
  const queryClient = useQueryClient()

  const { data: account } = useDefinedQuery(keys.account)
  const { data: entrant } = useDefinedQuery(keys.account.entrant)
  const { data: subjects } = useDefinedQuery(keys.account.entrant.subjects)

  const editAccountMutation = useMutation(editEntrantAccount, { onError: errorHandler })

  const onSubmit = async (entrant) => {
    const alert = toast.loading("Сохранение профиля...")

    console.log(entrant)

    try {
      await editAccountMutation.mutateAsync(entrant)
      await queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("account"),
      })

      toast.success("Профиль успешно сохранён", { id: alert })
    } catch {
      toast.dismiss(alert)
    }
  }

  const defaultValues = useMemo(() => {
    if (!entrant || !account || !subjects) return null
    return { ...entrant, ...account, subjects }
  }, [entrant, account, subjects])

  if (!defaultValues) return "Загрузка..."

  return (
    <ProfileForm
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      disabled={editAccountMutation.isLoading}
      {...props}
    />
  )
}

export default ProfileFormContainer
