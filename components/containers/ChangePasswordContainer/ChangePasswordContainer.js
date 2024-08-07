import { useMutation } from "react-query"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useDefinedQuery, { keys } from "hooks/use-defined-query"

import ChangePassForm from "components/forms/ChangePassFrom/ChangePassForm"

import { changeUserPassword } from "api/auth"

import errorHandler from "helpers/error-handler"

const ChangePasswordContainer = () => {
  const router = useRouter()
  const { data: userData } = useDefinedQuery(keys.account)

  const user_id = userData?.id

  const changePasswordMutation = useMutation(changeUserPassword, {onError: errorHandler })

  const onSubmit = async (data) => {
    const alert = toast.loading("Изменение пароля...")
    
    const requestData = {...data, user_id}

    try {
      const requestData = {...data, user_id}
      await changePasswordMutation.mutateAsync(requestData)
      toast.success("Пароль успешно изменен")
      await router.push("/profile/")
    } catch {
      toast.dismiss(alert)
    }
  }


  return(
    <ChangePassForm onSubmit={onSubmit} disabled={changePasswordMutation.isLoading}/>
  )
}

export default ChangePasswordContainer