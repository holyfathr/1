import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { useRouter } from "next/router"

import LogoutForm from "components/forms/LogoutForm"

import useIsPro from "hooks/use-is-pro"

import { logout } from "api/auth"

import errorHandler from "helpers/error-handler"

const LogoutFormContainer = () => {
  const queryClient = useQueryClient()
  const isPro = useIsPro()
  const router = useRouter()

  const logoutMutation = useMutation(logout, { onError: errorHandler })

  const onSubmit = async () => {
    const alert = toast.loading("Выход...")

    try {
      await logoutMutation.mutateAsync()
      queryClient.removeQueries()

      await router.push(isPro ? "/pro/login/" : "/login/")
    } catch {
      toast.dismiss(alert)
    }
  }

  return <LogoutForm onSubmit={onSubmit} disabled={logoutMutation.isLoading} />
}

export default LogoutFormContainer
